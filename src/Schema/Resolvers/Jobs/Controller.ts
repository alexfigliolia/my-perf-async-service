import { ORM } from "ORM";

export class JobController {
  public static enqueueNext() {
    return ORM.job.findFirst({
      orderBy: {
        created_at: "asc",
      },
      include: {
        repositoryPull: true,
      },
    });
  }
}
