import { GraphQLError } from "graphql";
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
      include: {
        repositoryPull: true,
      },
    });
  }

  public static async poll() {
    try {
      const job = await ORM.job.findFirstOrThrow({
        where: {
          AND: [
            {
              repositoryPull: {
                isNot: null,
              },
            },
            { status: "pending" },
          ],
        },
        orderBy: {
          created_at: "asc",
        },
        select: {
          repositoryPull: true,
        },
      });
      if (!job.repositoryPull) {
        throw "something";
      }
      return job.repositoryPull;
    } catch (error) {
      throw new GraphQLError("No repository pull jobs remaining");
    }
  }
}
