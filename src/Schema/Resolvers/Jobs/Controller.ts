import { ORM } from "ORM";
import type { IJobStatus } from "./types";

export class JobController {
  public static setStatus({ id, status }: IJobStatus) {
    return ORM.query(
      ORM.job.update({
        where: { id },
        data: { status },
      }),
    );
  }
}
