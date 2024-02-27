import { GraphQLError } from "graphql";
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
        repositoryStatsPull: true,
      },
    });
  }

  public static async poll() {
    try {
      const job = await ORM.job.findFirstOrThrow({
        where: {
          AND: [
            {
              repositoryStatsPull: {
                isNot: null,
              },
            },
            {
              status: {
                in: ["failed", "pending"],
              },
            },
          ],
        },
        orderBy: {
          created_at: "asc",
        },
        select: {
          id: true,
          repositoryStatsPull: true,
        },
      });
      if (!job.repositoryStatsPull) {
        throw "something";
      }
      await ORM.job.update({
        where: { id: job.id },
        data: { status: "inprogress" },
      });
      return job.repositoryStatsPull;
    } catch (error) {
      throw new GraphQLError("No repository stats pull jobs remaining");
    }
  }
}
