import http from "http";
import { app } from "./app";

const PORT: number = parseInt(process.env.PORT || "8080", 10);

function startServer(): void {
  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
}

startServer();
