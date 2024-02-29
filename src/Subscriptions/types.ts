import type { RepositoryPull, RepositoryStatsPull } from "@prisma/client";

export type Channels = {
  repositoryPull: [job: RepositoryPull];
  repositoryStatsPull: [job: RepositoryStatsPull];
};
