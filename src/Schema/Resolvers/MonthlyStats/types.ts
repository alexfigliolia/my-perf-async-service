export interface ICreateMonthlyPull {
  date: string;
  email: string;
  token: string;
  userId: number;
  clone_url: string;
  repositoryId: number;
}

export interface IMonthlyStatsPull extends ICreateMonthlyPull {
  id: number;
}

export interface IMonthlyStatsPullJob extends IMonthlyStatsPull {
  jobId: number;
}
