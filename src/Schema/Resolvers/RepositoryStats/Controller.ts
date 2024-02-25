import { ORM } from "ORM";
import type { IRegisterRepoStats } from "./types";

export class RepositoryStatsController {
  public static registerJob(args: IRegisterRepoStats) {
    return ORM.job.create({
      data: {
        repositoryStatsPull: {
          create: args,
        },
      },
      select: {
        id: true,
      },
    });
  }
}
