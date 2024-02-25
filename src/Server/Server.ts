import express from "express";
import { readFileSync } from "fs";
import path from "path";
import { createServer } from "spdy";
import { Environment } from "Environment";
import { Logger } from "Logger";
import { Middleware } from "./Middleware";
import { ProcessManager } from "./ProcessManager";

export class Server extends ProcessManager {
  public static APP = express();
  private static CERTS = path.resolve(__dirname, Environment.CERTS_PATH);

  public static start() {
    this.listenForKills();
    Middleware.register(this.APP).build();
    const server = this.registerHTTP2();
    this.Server = server.listen({ port: Environment.SERVER_PORT });
    return this.Server;
  }

  public static get() {
    if (!this.Server) {
      return this.start();
    }
    return this.Server;
  }

  private static registerHTTP2() {
    if (!Environment.SSL) {
      Logger.core("Running HTTP/1");
      return this.APP;
    }
    Logger.core("Running HTTP/2");
    return createServer(this.keys, this.APP);
  }

  private static get keys() {
    if (Environment.LOCAL) {
      return {
        key: readFileSync(`${this.CERTS}/server.key`),
        cert: readFileSync(`${this.CERTS}/server.cert`),
      };
    }
    return {};
  }
}
