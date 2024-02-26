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

export interface IRepositoryPullJob {
  id: number;
  jobId: number;
  api_url: string;
  token: string;
  platform: Platform;
  currentPage: number;
  pageSize: number;
  organizationId: number;
  requestMethod: RequestMethod;
}
