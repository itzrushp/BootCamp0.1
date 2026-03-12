// Use normal core https module here todo the same , just use a todolist 

const http = require('http');

const todo = [];
let ids = 0;

const server = http.createServer((req, res) => {
    // Extract the URL Objects 
    const URLobj = new URL(req.url, `http://${req.headers.host}`);
    const path = URLobj.pathname;
    const queryId = URLobj.searchParams.get('id');

    // Helper ParseId function :
    const parsedId = (raw) => {
        const n = parseInt(raw, 10);
        return (!isNaN(n) && String(n) === raw) ? n : null;
    }

    // GET /  ────────────────────────────────────────────────────────
    if (req.method === 'GET' && path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
    }

    // GET /todos  ────────────────────────────────────────────────────────
    else if (req.method === 'GET' && path == '/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todo));
    }

    // GET /todo?id  ────────────────────────────────────────────────────────
    else if (req.method === 'GET' && path === '/todo') {
        const id = parsedId(queryId);
        const found = id !== null ? todo.find(t => t.id === id) : null;

        if (!found) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Todo not found' }));
            return;
        }
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(found));
    }

    // POST /create/todo  ────────────────────────────────────────────────────────
    else if (req.method === 'POST' && path === '/create/todo') {
        let body = ''; // empty string

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { title, description } = JSON.parse(body);
            ids++;
            const newTodo = { id: ids, title, description };
            todo.push(newTodo);


            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(todo));
        })
    }

    // DELETE /todo  ────────────────────────────────────────────────────────
    else if (req.method === 'DELETE' && path === '/todo') {
        const id = parsedId(queryId);
        const index = id !== null ? todo.find(t => t.id === id) : -1;
        if (index === -1) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ error: 'Todo not found' }));
            return;
        }
        todo.splice(index, 1);  // deleting that particular todo 
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todo));

    }
    // ── 404 catch-all ────────────────────────────────────────────────────────
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});


module.exports = server;

