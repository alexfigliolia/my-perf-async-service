import { GraphQLError } from "graphql";
import { ORM } from "ORM";
import type { ICreateMonthlyPull } from "./types";

export class MonthlyStatsPullController {
  public static registerJob(args: ICreateMonthlyPull) {
    return ORM.job.create({
      data: {
        monthlyUserStatsPull: {
          create: args,
        },
      },
      include: {
        monthlyUserStatsPull: true,
      },
    });
  }

  public static async poll() {
    try {
      const job = await ORM.job.findFirstOrThrow({
        where: {
          AND: [
            {
              monthlyUserStatsPull: {
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
          monthlyUserStatsPull: true,
        },
      });
      if (!job.monthlyUserStatsPull) {
        throw "something";
      }
      await ORM.job.update({
        where: { id: job.id },
        data: { status: "inprogress" },
      });
      return job.monthlyUserStatsPull;
    } catch (error) {
      throw new GraphQLError("No monthly user stats pull jobs remaining");
    }
  }
}
