import type { GraphQLFieldConfig } from "graphql";
import { GraphQLBoolean, GraphQLError, GraphQLInt } from "graphql";
import { JobStatusType } from "Schema/Resolvers/Jobs/GQLTypes";
import type { IJobStatus } from "Schema/Resolvers/Jobs/types";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { Subscriptions } from "Subscriptions";
import { RepositoryStatsController } from "./Controller";
import {
  RepositoryStatsJobArguments,
  RepositoryStatsPullJobType,
} from "./GQLTypes";
import type { IRegisterRepoStats, IRepoID, IRepoStatsPullJob } from "./types";

export const subscribeToRepositoryStats: GraphQLFieldConfig<
  any,
  Context,
  IRegisterRepoStats
> = {
  type: SchemaBuilder.nonNull(GraphQLInt),
  args: RepositoryStatsJobArguments,
  resolve: async (_, args) => {
    const job =
      await RepositoryStatsController.subscribeToRepositoryStats(args);
    if (!job.repositoryStatsPull) {
      throw new GraphQLError("Failed to create repository stats pull");
    }
    Subscriptions.publish("repositoryStatsPull", job.repositoryStatsPull);
    return job.id;
  },
};

export const registerRepositoryStatsPull: GraphQLFieldConfig<
  any,
  Context,
  IRegisterRepoStats
> = {
  type: SchemaBuilder.nonNull(GraphQLInt),
  args: RepositoryStatsJobArguments,
  resolve: async (_, args) => {
    const job = await RepositoryStatsController.registerJob(args);
    if (!job.repositoryStatsPull) {
      throw new GraphQLError("Failed to create repository stats pull");
    }
    Subscriptions.publish("repositoryStatsPull", job.repositoryStatsPull);
    return job.id;
  },
};

export const nextRepositoryStatsPullJob: GraphQLFieldConfig<
  any,
  Context,
  Record<string, never>
> = {
  type: SchemaBuilder.nonNull(RepositoryStatsPullJobType),
  resolve: () => {
    return RepositoryStatsController.poll();
  },
};

export const repositoryStatsPulls: GraphQLFieldConfig<
  IRepoStatsPullJob,
  Context,
  Record<string, never>
> = {
  type: SchemaBuilder.nonNull(RepositoryStatsPullJobType),
  subscribe: () => {
    return Subscriptions.subscribe("repositoryStatsPull");
  },
  resolve: job => job,
};

export const setRepositoryStatsJobStatus: GraphQLFieldConfig<
  any,
  Context,
  IJobStatus
> = {
  type: SchemaBuilder.nonNull(GraphQLBoolean),
  args: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    status: {
      type: SchemaBuilder.nonNull(JobStatusType),
    },
  },
  resolve: async (_, args) => {
    await RepositoryStatsController.setJobStatus(args);
    return true;
  },
};

export const deleteRepositoryStatsJobs: GraphQLFieldConfig<
  any,
  Context,
  IRepoID
> = {
  type: SchemaBuilder.nonNull(GraphQLBoolean),
  args: {
    repositoryId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
  },
  resolve: async (_, args) => {
    await RepositoryStatsController.deleteAll(args.repositoryId);
    return true;
  },
};
