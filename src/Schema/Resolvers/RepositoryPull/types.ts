import type { RequestMethod } from "@prisma/client";

export interface ICreatePull {
  api_url: string;
  token: string;
  organizationId: number;
  requestMethod: RequestMethod;
}

export interface IRepositoryPull extends ICreatePull {
  id: number;
  currentPage: number;
  pageSize: number;
}
