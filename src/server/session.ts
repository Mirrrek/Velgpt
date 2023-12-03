import Connection from '@shared/connection';
import * as packets from '@shared/packets';

type User = {
    name: string;
    group: string | null;
    connection: Connection;
}

export default class Session {
    private subject: string;
    private users: Map<string, User>;

    constructor(subject: string) {
        this.subject = subject;
        this.users = new Map();
    }

    add(userID: string, name: string, connection: Connection): void {
        this.users.set(userID, { name, group: null, connection });
        this.emitUserList();

        connection.on<packets.RegisterGroupPacket>(packets.PacketType.SB_REGISTER_GROUP, (data) => {
            if (typeof data.group !== 'string') {
                connection.send<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, {});
                return;
            }

            if (!this.users.has(userID)) {
                connection.send<packets.ErrorInvalidStatePacket>(packets.PacketType.CB_ERROR_INVALID_STATE, {});
                return;
            }

            if (this.users.get(userID)!.group !== null) {
                connection.send<packets.ErrorInvalidStatePacket>(packets.PacketType.CB_ERROR_INVALID_STATE, {});
                return;
            }

            this.users.get(userID)!.group = data.group;
            this.emitUserList();
        });
    }

    has(userID: string): boolean {
        return this.users.has(userID);
    }

    remove(userID: string): void {
        this.users.delete(userID);
        this.emitUserList();
    }

    private emitUserList(): void {
        this.users.forEach((user) => {
            user.connection.send<packets.UpdateUserListPacket>(packets.PacketType.CB_UPDATE_USER_LIST, {
                users: Array.from(this.users.values()).map((user) => ({ name: user.name, group: user.group }))
            });
        });
    }
}
