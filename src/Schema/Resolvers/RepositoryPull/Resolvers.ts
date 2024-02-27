import type { GraphQLFieldConfig } from "graphql";
import { GraphQLError, GraphQLInt, GraphQLString } from "graphql";
import { PlatformType } from "Schema/Resolvers/Platform/GQLTypes";
import { RequestMethodType } from "Schema/Resolvers/RequestMethod/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { Subscriptions } from "Subscriptions";
import { RepositoryPullController } from "./Controller";
import { RepositoryPullJobType } from "./GQLTypes";
import type { ICreatePull, IRepositoryPullJob } from "./types";

export const registerRepositoryPull: GraphQLFieldConfig<
  any,
  Context,
  ICreatePull
> = {
  type: SchemaBuilder.nonNull(GraphQLInt),
  args: {
    token: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    api_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    platform: {
      type: SchemaBuilder.nonNull(PlatformType),
    },
    requestMethod: {
      type: SchemaBuilder.nonNull(RequestMethodType),
    },
    organizationId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
  },
  resolve: async (_, args) => {
    const job = await RepositoryPullController.registerJob(args);
    if (!job.repositoryPull) {
      throw new GraphQLError("Failed to create repository pull");
    }
    Subscriptions.publish("repositoryPull", job.repositoryPull);
    return job.id;
  },
};

export const nextRepositoryPullJob: GraphQLFieldConfig<
  any,
  Context,
  Record<string, never>
> = {
  type: SchemaBuilder.nonNull(RepositoryPullJobType),
  resolve: () => {
    return RepositoryPullController.poll();
  },
};

export const repositoryPulls: GraphQLFieldConfig<
  IRepositoryPullJob,
  Context,
  Record<string, never>
> = {
  type: SchemaBuilder.nonNull(RepositoryPullJobType),
  subscribe: () => {
    return Subscriptions.subscribe("repositoryPull");
  },
  resolve: job => job,
};
