import bodyParser from "body-parser";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { createYoga } from "graphql-yoga";
import { Environment } from "Environment";
import { Logger } from "Logger";
import { Schema } from "Schema";

export class Middleware {
  static App: Express;

  public static register(App: Express) {
    this.App = App;
    return this;
  }

  public static build() {
    this.guard();
    this.configureParser();
    this.configureCors();
    this.registerGQL();
  }

  private static configureParser() {
    this.App.use(bodyParser.json());
    this.App.use(bodyParser.urlencoded({ extended: true }));
  }

  private static configureCors() {
    this.App.use(
      cors({
        credentials: true,
        optionsSuccessStatus: 200,
        origin: [Environment.origin],
      }),
    );
    this.App.set("trust proxy", 1);
  }

  private static registerGQL() {
    Logger.GQL("Mounting GraphQL");
    const yoga = createYoga({
      schema: Schema,
      graphqlEndpoint: "/graphql",
      graphiql: Environment.LOCAL,
    });
    this.App.use(
      yoga.graphqlEndpoint,
      (req: Request, res: Response) => void yoga(req, res),
    );
  }

  private static guard() {
    if (!this.App) {
      throw new Error(
        "Did you forget to call Middleware.register() with your Express instance",
      );
    }
  }
}
