import Connection from '@shared/connection';

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
    }

    has(userID: string): boolean {
        return this.users.has(userID);
    }

    remove(userID: string): void {
        this.users.delete(userID);
    }

    getUserList(): { name: string; group: string | null; }[] {
        return Array.from(this.users.values()).map((user) => ({ name: user.name, group: user.group }));
    }
}
