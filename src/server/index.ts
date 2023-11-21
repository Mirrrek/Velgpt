import test from '@shared/test';
import { createServer } from 'http';

function main() {
    test();

    const server = createServer();

    server.on('request', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    });

    server.listen(443, () => {
        console.log('Server listening on port 443');
    });
}

main();
