import * as http from 'http';
import * as querystring from 'querystring';
import url from 'node:url';
import { getDataFromRequest } from './utils';
import { UserController } from './UserController';
import { HobbyController } from './HobbyController';

const userController = new UserController();
const hobbyController = new HobbyController();

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url || '');
    if (parsedUrl.pathname === "/users") {
      switch (req.method) {
        case "GET": {
          let parsedQs = querystring.parse(parsedUrl.query || '');
          res.writeHead(200, { "Content-Type": "application/json" });
          const id = parsedQs['id'] as string;
          if (!id) {
            res.end(JSON.stringify(userController.getAll()));
          } else {
            const hobbiesUrl = url.format({...parsedUrl, pathname: '/hobbies'});
            // HATEOAS
            const links = [
              {
                rel: "self",
                method: "GET",
                href: hobbiesUrl
              }
            ]
            res.end(JSON.stringify({ user: userController.getById(id), links }));
          }
          break;
        }

        case "POST":
          // get the data sent along
          let userData = await getDataFromRequest(req);
          // create the user
          const user = userController.create(JSON.parse(userData as string));
          // set the status code and content-type
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
          break;

        case "PUT": {
          let { id, data } = JSON.parse(await getDataFromRequest(req) as string) as { id: string, data: any };
          userController.update(id, data);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User has been updated" }));
          break;
        }

        case "DELETE":
          let { id } = JSON.parse(await getDataFromRequest(req) as string) as { id: string };
          userController.delete(id);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User has been deleted" }));
          break;

        default:
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Unsupported method" }));
      }
    } else if (parsedUrl.pathname === "/hobbies") {
      switch (req.method) {
        case "GET": {
          let parsedQs = querystring.parse(parsedUrl.query || '');
          res.setHeader('Cache-Control', 'public, max-age=31557600');
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(hobbyController.get(parsedQs['id'] as string)));
          break;
        }

        case "POST":
          let { id, hobby } = JSON.parse(await getDataFromRequest(req) as string) as { id: string, hobby: string };
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(hobbyController.add(id, hobby)));
          break;

        case "DELETE": {
          let { id, hobby } = JSON.parse(await getDataFromRequest(req) as string) as { id: string, hobby: string };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(hobbyController.delete(id, hobby)));
          break;
        }
        default:
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Unsupported method" }));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  } catch (e) {
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});