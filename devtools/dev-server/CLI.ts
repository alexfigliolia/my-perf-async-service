import { DevServer } from "@figliolia/typescript-dev-server";

(async () => {
  const Server = new DevServer({
    entryPoint: "src/Start.ts",
    serviceCommands: {
      Postgres: "brew services start postgresql@16",
    },
    killCommands: {
      Postgres: "brew services stop postgresql@16",
    },
    nodeOptions: {
      NODE_ENV: "development",
      NODE_OPTIONS: "--enable-source-maps",
      NODE_EXTRA_CA_CERTS: "../my-perf-core/cert/server.cert",
    },
  });
  await Server.run();
})().catch(console.log);
