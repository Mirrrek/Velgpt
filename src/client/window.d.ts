import Connection from '@shared/connection';

declare global {
    export interface Window {
        connection: Connection | undefined;
    }
}
