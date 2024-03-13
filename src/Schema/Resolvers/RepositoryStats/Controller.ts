import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import { GraphQLError } from "graphql";
import { Schedule } from "@prisma/client";
import { ORM } from "ORM";
import { JobController } from "Schema/Resolvers/Jobs/Controller";
import type { IJobStatus } from "Schema/Resolvers/Jobs/types";
import type { IRegisterCronArgs, IRegisterRepoStats } from "./types";

export class RepositoryStatsController {
  public static async subscribeToRepositoryStats(args: IRegisterRepoStats) {
    return Promise.all([
      this.registerCron({
        ...args,
        date: new Date(),
        schedule: Schedule.daily,
      }),
      this.registerCron({
        ...args,
        date: new Date(),
        range: Schedule.monthly,
        schedule: Schedule.monthly,
      }),
    ]);
  }

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
              OR: [
                {
                  AND: [
                    { schedule: Schedule.once },
                    { status: { notIn: ["complete", "inprogress"] } },
                  ],
                },
                {
                  AND: [
                    {
                      repositoryStatsPull: {
                        date: {
                          lte: new Date().toISOString(),
                        },
                      },
                    },
                    {
                      status: {
                        not: "inprogress",
                      },
                    },
                  ],
                },
              ],
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

  public static async setJobStatus(args: IJobStatus) {
    const job = await JobController.getStatsPullJob(args.id);
    if (!job || !job.repositoryStatsPull) {
      throw new Error("Error updating job: Job not found");
    }
    const { status } = args;
    if (job.schedule === Schedule.once || status !== "complete") {
      return JobController.setStatus(args);
    }
    return ORM.query(
      ORM.job.update({
        where: { id: args.id },
        data: {
          status,
          repositoryStatsPull: {
            update: {
              date: this.nextCronDate(job.schedule),
            },
          },
        },
      }),
    );
  }

  public static deleteAll(id: number) {
    return ORM.query(
      ORM.job.deleteMany({
        where: {
          repositoryStatsPull: {
            repositoryId: id,
          },
        },
      }),
    );
  }

  private static async registerCron(args: IRegisterCronArgs) {
    const { schedule, ...rest } = args;
    const job = await ORM.job.findFirst({
      where: {
        AND: [
          { schedule },
          {
            repositoryStatsPull: {
              repositoryId: rest.repositoryId,
            },
          },
        ],
      },
      select: {
        id: true,
        repositoryStatsPull: true,
      },
    });
    if (job) {
      return job;
    }
    return ORM.job.create({
      data: {
        schedule,
        repositoryStatsPull: {
          create: rest,
        },
      },
      select: {
        id: true,
        repositoryStatsPull: true,
      },
    });
  }

  private static nextCronDate(schedule: Schedule) {
    switch (schedule) {
      case Schedule.daily:
        return addDays(new Date(), 1).toISOString();
      case Schedule.weekly:
        return addWeeks(new Date(), 1).toISOString();
      case Schedule.monthly:
        return addMonths(new Date(), 1).toISOString();
      case Schedule.yearly:
        return addYears(new Date(), 1).toISOString();
      default:
        throw new Error("Unimplemented");
    }
  }
}
