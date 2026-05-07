import http from 'http';
// import data from './data.js';
import { customers} from './data.js';
const PORT = 8080;

const server = http.createServer((request, response) => {
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('Server is running');

    if(request.method !== 'GET') {
        response.writeHead(405, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    // response.writeHead(200, { 'Content-Type': 'application/json' });
    // response.end(JSON.stringify({ ok: true, count: customers.length }));

    const path = request.url.split('?')[0];
    if (path === '/customers') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({customers }));
    } 
    // get không đúng router
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not found' }));
    return;
});

server.listen(PORT, () => {
    console.log(`Server is running`);
});



