import http from 'node:http';
import {routes} from './routes/routes.js'
import { bodyParser } from './middlewares/body-parser.js';
import {extrarctQueryParameters} from './utils/extract-query-parameters.js'
const server = http.createServer((req, res) => {
    bodyParser(req, res);
    const { url, method } = req;
    const route = routes.find(route => {
        return (route.url.test(url) && method === route.method)
    });
    if (route) {
        const routesParams = req.url.match(route.url)
        const { query, ...params } = routesParams.groups;
        req.params = params;
        req.query = query ? extrarctQueryParameters(query) : {};
    }
    return res.writeHead(404).end;
});
const PORT = 3000;
server.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
