import { ORM } from "ORM";
import type { ICreatePull } from "./types";

export class RepositoryPullController {
  public static registerJob({ token, api_url, organizationId }: ICreatePull) {
    return ORM.job.create({
      data: {
        repositoryPull: {
          create: {
            token,
            api_url,
            organizationId,
          },
        },
      },
      select: {
        id: true,
      },
    });
  }
}
