import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import { GraphQLError } from "graphql";
import { JobStatus, Schedule } from "@prisma/client";
import { ORM } from "ORM";
import { JobController } from "Schema/Resolvers/Jobs/Controller";
import type { IJobStatus } from "Schema/Resolvers/Jobs/types";
import type { IRegisterRepoStats } from "./types";

export class RepositoryStatsController {
  public static async registerJob(args: IRegisterRepoStats) {
    const [job] = await ORM.$transaction([
      ORM.job.create({
        data: {
          repositoryStatsPull: {
            create: args,
          },
        },
        select: {
          id: true,
          repositoryStatsPull: true,
        },
      }),
      ORM.job.create({
        data: {
          schedule: Schedule.monthly,
          repositoryStatsPull: {
            create: {
              ...args,
              date: new Date().toISOString(),
            },
          },
        },
        select: {
          id: true,
          repositoryStatsPull: true,
        },
      }),
    ]);
    return job;
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
                { schedule: Schedule.once },
                {
                  repositoryStatsPull: {
                    date: {
                      lte: new Date().toISOString(),
                    },
                  },
                },
              ],
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

  public static async setJobStatus(args: IJobStatus) {
    const job = await JobController.getStatsPullJob(args.id);
    if (!job || !job.repositoryStatsPull) {
      throw new Error("Error updating job: Job not found");
    }
    const { status } = args;
    if (!job.repositoryStatsPull.date || status === JobStatus.failed) {
      return JobController.setStatus(args);
    }
    if (status === JobStatus.complete) {
      return ORM.query(
        ORM.repositoryStatsPull.update({
          where: { id: job.repositoryStatsPull.id },
          data: {
            date: this.nextCronDate(job.schedule),
          },
        }),
      );
    }
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
