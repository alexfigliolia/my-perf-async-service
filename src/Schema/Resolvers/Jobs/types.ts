import type { JobStatus, Schedule } from "@prisma/client";
import type { IRepositoryPull } from "Schema/Resolvers/RepositoryPull/types";

export interface IJobStatus {
  id: number;
  status: JobStatus;
}

export interface IJob extends IJobStatus {
  created_at: string;
  schedule: Schedule;
  repositoryPull: null | IRepositoryPull;
}

export interface IByOrganization {
  organizationId: number;
}

export interface BaseCloneJob {
  id: number;
  clone_url: string;
  token: string;
  repositoryId: number;
  organizationId: number;
}
