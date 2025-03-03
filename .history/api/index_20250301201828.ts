import http from "http";
import { app } from "./app";

const PORT: number = 5000;

function startServer(): void {
  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
}

startServer();
