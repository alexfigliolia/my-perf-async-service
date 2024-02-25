import { ORM } from "ORM";
import type { ICreatePull } from "./types";

export class RepositoryPullController {
  public static registerJob(args: ICreatePull) {
    return ORM.job.create({
      data: {
        repositoryPull: {
          create: args,
        },
      },
      select: {
        id: true,
      },
    });
  }
}
