import type { JobStatus } from "@prisma/client";
import type { IRepositoryPull } from "Schema/Resolvers/RepositoryPull/types";

export interface IJob {
  id: number;
  status: JobStatus;
  created_at: string;
  repositoryPull: null | IRepositoryPull;
}
