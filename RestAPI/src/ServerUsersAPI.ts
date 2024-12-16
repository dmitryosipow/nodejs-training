import * as http from 'http';
import * as querystring from 'querystring';
import url from 'node:url';
import { getDataFromRequest } from './utils';
import { UserController } from './UserController';
import { HobbyController } from './HobbyController';

const userController = new UserController();
const hobbyController = new HobbyController();

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const reqUrl = new URL(req.url || '', 'http://localhost');
    const pathes = reqUrl.pathname.split('/');
    if (pathes[1] === "users") {
      switch (req.method) {
        case "GET": {
          res.writeHead(200, { "Content-Type": "application/json" });
          const userId = (pathes.length > 2 && pathes[2] || '' );
          if (!userId) {
            res.end(JSON.stringify(userController.getAll()));
          } else {
            const hobbiesUrl = new URL(req.url || '', 'http://localhost');
            hobbiesUrl.pathname = `/hobbies/${userId}`;
            // HATEOAS
            const links = [
              {
                rel: "self",
                method: "GET",
                href: hobbiesUrl
              }
            ]
            res.end(JSON.stringify({ user: userController.getById(userId), links }));
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
          const userId = (pathes.length > 2 && pathes[2] || '' );
          //let { id } = JSON.parse(await getDataFromRequest(req) as string) as { id: string };
          if (userId) {
            userController.delete(userId);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User has been deleted" }));
          } else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User ID is required" }));
          }
          break;

        default:
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Unsupported method" }));
      }
    } else if (pathes[1] === "hobbies") {
      const userId = (pathes.length > 2 && pathes[2] || '' );
      switch (req.method) {
        case "GET": {
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(hobbyController.get(userId || '')));
          break;
        }

        case "POST":
          let { hobby } = JSON.parse(await getDataFromRequest(req) as string) as { id: string, hobby: string };
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(hobbyController.add(userId, hobby)));
          break;

        case "PATCH": {
          let { hobbies } = JSON.parse(await getDataFromRequest(req) as string) as { hobbies: string[] };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(hobbyController.update(userId, hobbies)));
          break;
        }

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
  } catch (e: any) {
    if (e.message.includes('No user has been found')) {
      res.writeHead(404, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});