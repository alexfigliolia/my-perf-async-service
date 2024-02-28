import type { GraphQLFieldConfig } from "graphql";
import { GraphQLError, GraphQLInt, GraphQLString } from "graphql";
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
