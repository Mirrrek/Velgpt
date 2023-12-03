import { createServer } from 'https';
import { WebSocketServer } from 'ws';
import Session from '@server/session';
import cors from '@server/cors';
import env from '@env';
import log from '@shared/log';
import Connection from '@shared/connection';
import * as packets from '@shared/packets';
import { OAuth2Client } from 'google-auth-library';
import configuration from '@shared/configuration';

function main() {
    const server = createServer({
        cert: env.SSL_CERT,
        key: env.SSL_KEY
    });

    server.on('request', cors);

    server.listen(443, () => {
        console.log('Server listening on port 443');
    });

    const wss = new WebSocketServer({ server });

    const oauthClient = new OAuth2Client();

    const sessions = new Map<string, Session>();

    wss.on('connection', (socket, req) => {
        log('INFO', `<${req.socket.remoteAddress}> Connected`);

        const connection = new Connection(socket as any);

        let state: { session: Session, userID: string } | null = null;

        connection.on<packets.PingPacket>(packets.PacketType.SB_PING, (data) => {
            if (typeof data.random !== 'number' || data.random < 0 || data.random > 0xffffffff || data.random % 1 !== 0) {
                connection.send<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, {});
                return;
            }

            connection.send<packets.PongPacket>(packets.PacketType.CB_PONG, {
                echo: data.random
            });
        });

        connection.on<packets.AuthenticatePacket>(packets.PacketType.SB_AUTHENTICATE, (data) => {
            if (typeof data.subject !== 'string') {
                connection.send<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, {});
                return;
            }

            if (typeof data.token !== 'string') {
                connection.send<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, {});
                return;
            }

            if (state !== null) {
                connection.send<packets.ErrorInvalidStatePacket>(packets.PacketType.CB_ERROR_INVALID_STATE, {});
                return;
            }

            oauthClient.verifyIdToken({
                idToken: data.token,
                audience: process.env.GOOGLE_CLIENT_ID
            }).then((ticket) => ticket.getPayload()).then((payload) => {
                if (payload === undefined) {
                    connection.send<packets.ErrorAuthenticationFailedPacket>(packets.PacketType.CB_ERROR_AUTHENTICATION_FAILED, {});
                    return;
                }

                if (!configuration.some((subject) => subject.id === data.subject)) {
                    connection.send<packets.ErrorInvalidSubjectPacket>(packets.PacketType.CB_ERROR_INVALID_SUBJECT, {});
                    return;
                }

                if (!sessions.has(data.subject)) {
                    sessions.set(data.subject, new Session(data.subject));
                }

                if (sessions.get(data.subject)!.has(payload.sub)) {
                    connection.send<packets.ErrorSessionExistsPacket>(packets.PacketType.CB_ERROR_SESSION_EXISTS, {});
                    return;
                }

                log('INFO', `<${req.socket.remoteAddress}> Joining session as "${payload.name ?? 'Unknown user'}" (${payload.sub}) for subject "${data.subject}"`);

                state = { session: sessions.get(data.subject)!, userID: payload.sub };
                connection.send<packets.AuthenticatedPacket>(packets.PacketType.CB_AUTHENTICATED, {});
                sessions.get(data.subject)!.add(payload.sub, payload.name ?? 'Unknown user', connection);
            });
        });

        socket.addEventListener('close', () => {
            if (state !== null) {
                log('INFO', `<${req.socket.remoteAddress}> Leaving session`);
                state.session.remove(state.userID);
            }
            log('INFO', `<${req.socket.remoteAddress}> Disconnected`);
        });
    });
}

main();
