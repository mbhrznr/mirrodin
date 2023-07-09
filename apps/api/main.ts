import createServer from "~/server/server";
import prepareServer from "~/server/prepare";

await prepareServer();

const port = 3001;
const server = createServer();

server.listen(
  port,
  () =>
    `- ready started server on 0.0.0.0:${port}, url: http://localhost:${port}`
);
