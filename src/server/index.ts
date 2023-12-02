import { createServer } from 'https';
import cors from '@server/cors';
import env from '@env';

function main() {
    const server = createServer({
        cert: env.SSL_CERT,
        key: env.SSL_KEY
    });

    server.on('request', cors);

    server.listen(443, () => {
        console.log('Server listening on port 443');
    });
}

main();
