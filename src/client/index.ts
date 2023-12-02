import * as packets from '@shared/packets';
import Connection from '@shared/connection';
import App from '@components/App';
import ErrorLayout from '@components/layouts/ErrorLayout';
import env from '@env';
import log from '@shared/log';
import '@client/global.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

function main() {
    const socket = new WebSocket(env.WEBSOCKET_URL);
    socket.addEventListener('open', () => {
        log('INFO', 'Connected to server');

        const connection = new Connection(socket);

        connection.on<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, (data) => {
            log('ERROR', 'Received ERROR_INVALID_PACKET');
        });

        connection.on<packets.ErrorInvalidStatePacket>(packets.PacketType.CB_ERROR_INVALID_STATE, (data) => {
            log('ERROR', 'Received ERROR_INVALID_STATE');
        });

        connection.on<packets.ErrorInvalidSubjectPacket>(packets.PacketType.CB_ERROR_INVALID_SUBJECT, (data) => {
            log('ERROR', 'Received ERROR_INVALID_SUBJECT');
        });

        connection.on<packets.ErrorSessionExistsPacket>(packets.PacketType.CB_ERROR_SESSION_EXISTS, (data) => {
            log('ERROR', 'Received ERROR_SESSION_EXISTS');
        });

        connection.on<packets.ErrorInvalidTermPacket>(packets.PacketType.CB_ERROR_INVALID_TERM, (data) => {
            log('ERROR', 'Received ERROR_INVALID_TERM');
        });

        connection.on<packets.ErrorInvalidGroupPacket>(packets.PacketType.CB_ERROR_INVALID_GROUP, (data) => {
            log('ERROR', 'Received ERROR_INVALID_GROUP');
        });

        connection.on<packets.ErrorUnexpectedPacket>(packets.PacketType.CB_ERROR_UNEXPECTED, (data) => {
            log('ERROR', 'Received ERROR_UNEXPECTED');
        });

        const random = (Math.random() * 0xffffffff) | 0;
        connection.send<packets.PingPacket>(packets.PacketType.SB_PING, { random });
        connection.await<packets.PongPacket>(packets.PacketType.CB_PONG).then((packet) => {
            if (packet.echo !== random) {
                log('ERROR', 'Echo mismatch!');
                throw new Error('Echo mismatch!');
            }

            log('INFO', 'Received PONG');
            window.connection = connection;
        });
    });

    const errorBoundary = React.createElement(ErrorBoundary, { fallback: React.createElement(ErrorLayout) }, React.createElement(App));
    ReactDOM.createRoot(document.getElementById('app')!).render(errorBoundary);
}

main();
