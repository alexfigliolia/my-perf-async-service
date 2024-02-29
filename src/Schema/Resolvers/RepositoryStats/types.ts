import type { Schedule } from "@prisma/client";

export interface IRepoID {
  repositoryId: number;
}

export interface IRegisterRepoStats extends IRepoID {
  date?: Date;
  token: string;
  range?: Schedule;
  clone_url: string;
  organizationId: number;
}

export interface IRepoStatsPull extends IRegisterRepoStats {
  id: number;
}

export interface IRepoStatsPullJob extends IRepoStatsPull {
  jobId: number;
  schedule: Schedule;
}

export interface IRegisterCronArgs extends IRegisterRepoStats {
  schedule: Schedule;
}
