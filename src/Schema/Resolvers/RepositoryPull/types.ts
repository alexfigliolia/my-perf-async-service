import type { Platform, RequestMethod } from "@prisma/client";

export interface ICreatePull {
  token: string;
  api_url: string;
  platform: Platform;
  organizationId: number;
  requestMethod: RequestMethod;
}

export interface IRepositoryPull extends ICreatePull {
  id: number;
  currentPage: number;
  pageSize: number;
}

export interface IRepositoryPullJob extends IRepositoryPull {
  jobId: number;
}
