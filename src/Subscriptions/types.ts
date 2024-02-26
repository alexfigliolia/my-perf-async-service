import type { RepositoryPull } from "@prisma/client";

export type Channels = {
  repositoryPull: [job: RepositoryPull];
};
