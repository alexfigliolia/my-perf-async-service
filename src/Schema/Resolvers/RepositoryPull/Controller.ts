import { GraphQLError } from "graphql";
import { Errors } from "@alexfigliolia/my-performance-gql-errors";
import { Schedule } from "@prisma/client";
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
            {
              schedule: Schedule.once,
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
          repositoryPull: true,
        },
      });
      if (!job.repositoryPull) {
        throw "something";
      }
      await ORM.job.update({
        where: { id: job.id },
        data: { status: "inprogress" },
      });
      return job.repositoryPull;
    } catch (error) {
      throw new GraphQLError("No repository pull jobs remaining");
    }
  }

  public static async statusCheck(organizationId: number) {
    const job = await ORM.query(
      ORM.job.findFirst({
        where: {
          repositoryPull: {
            organizationId,
          },
        },
        select: {
          status: true,
        },
      }),
    );
    if (!job) {
      throw Errors.createError("NOT_FOUND", "Repository Pull job not found");
    }
    return job.status;
  }
}
