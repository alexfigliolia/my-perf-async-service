import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLBoolean,
  GraphQLError,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import { JobStatusType } from "Schema/Resolvers/Jobs/GQLTypes";
import type { IJobStatus } from "Schema/Resolvers/Jobs/types";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { Subscriptions } from "Subscriptions";
import { RepositoryStatsController } from "./Controller";
import { RepositoryStatsPullJobType } from "./GQLTypes";
import type { IRegisterRepoStats } from "./types";

export const registerRepositoryStatsPull: GraphQLFieldConfig<
  any,
  Context,
  IRegisterRepoStats
> = {
  type: SchemaBuilder.nonNull(GraphQLInt),
  args: {
    date: {
      type: GraphQLString,
    },
    token: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    clone_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    repositoryId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    organizationId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
  },
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
  any,
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
