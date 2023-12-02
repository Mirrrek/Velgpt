import * as packets from '@shared/packets';

export default class Connection {
    private socket: WebSocket;
    private listeners: { code: number, callback: (data: any) => void, persistent: boolean }[];

    constructor(socket: WebSocket) {
        this.socket = socket;
        this.listeners = [];

        this.socket.addEventListener('message', (event) => {
            const packet = JSON.parse(event.data);
            if (typeof packet !== 'object' || packet === null) {
                this.send<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, {});
                return;
            }

            if (typeof packet.code !== 'number' || packet.code < 0 || packet.code > 0xff || packet.code % 1 !== 0) {
                this.send<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, {});
                return;
            }

            if (typeof packet.data !== 'object' || packet.data === null) {
                this.send<packets.ErrorInvalidPacketPacket>(packets.PacketType.CB_ERROR_INVALID_PACKET, {});
                return;
            }

            this.onMessage(packet);
        });
    }

    send<T extends packets.IPacket<any, any>>(code: T['code'], data: T['data']) {
        this.socket.send(JSON.stringify({ code, data }));
    }

    await<T extends packets.IPacket<any, any>>(code: T['code']): Promise<T['data']> {
        return new Promise((resolve, reject) => {
            this.listeners.push({ code, callback: resolve, persistent: false });
        });
    }

    on<T extends packets.IPacket<any, any>>(code: T['code'], callback: (data: T['data']) => void) {
        this.listeners.push({ code, callback, persistent: true });
    }

    private onMessage(packet: packets.IPacket<any, any>) {
        const listeners = this.listeners.filter((listener) => listener.code === packet.code);

        for (const listener of listeners) {
            listener.callback(packet.data);
            if (!listener.persistent) {
                this.listeners.splice(this.listeners.indexOf(listener), 1);
            }
        }
    }
}
