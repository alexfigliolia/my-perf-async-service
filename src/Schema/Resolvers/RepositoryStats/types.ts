export interface IRegisterRepoStats {
  date?: Date;
  token: string;
  clone_url: string;
  repositoryId: number;
  organizationId: number;
}

export interface IRepoStatsPull extends IRegisterRepoStats {
  id: number;
}

export interface IRepoStatsPullJob extends IRepoStatsPull {
  jobId: number;
}
