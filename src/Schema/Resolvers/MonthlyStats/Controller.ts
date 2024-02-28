import { GraphQLError } from "graphql";
import { ORM } from "ORM";
import type { ICreateMonthlyPull } from "./types";

export class MonthlyStatsPullController {
  public static registerJob(args: ICreateMonthlyPull) {
    return ORM.job.create({
      data: {
        MonthlyUserStatsPull: {
          create: args,
        },
      },
      include: {
        MonthlyUserStatsPull: true,
      },
    });
  }

  public static async poll() {
    try {
      const job = await ORM.job.findFirstOrThrow({
        where: {
          AND: [
            {
              MonthlyUserStatsPull: {
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
          MonthlyUserStatsPull: true,
        },
      });
      if (!job.MonthlyUserStatsPull) {
        throw "something";
      }
      await ORM.job.update({
        where: { id: job.id },
        data: { status: "inprogress" },
      });
      return job.MonthlyUserStatsPull;
    } catch (error) {
      throw new GraphQLError("No monthly user stats pull jobs remaining");
    }
  }
}
