import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { PlatformType } from "Schema/Resolvers/Platform/GQLTypes";
import { RequestMethodType } from "Schema/Resolvers/RequestMethod/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { IRepositoryPull, IRepositoryPullJob } from "./types";

export const RepositoryPullType = new GraphQLObjectType<
  IRepositoryPull,
  Context
>({
  name: "RepositoryPull",
  fields: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.id,
    },
    api_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.api_url,
    },
    token: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.token,
    },
    currentPage: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.currentPage,
    },
    pageSize: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.pageSize,
    },
    platform: {
      type: SchemaBuilder.nonNull(PlatformType),
      resolve: pull => pull.platform,
    },
    requestMethod: {
      type: SchemaBuilder.nonNull(RequestMethodType),
      resolve: pull => pull.requestMethod,
    },
    organizationId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.organizationId,
    },
  },
});

export const RepositoryPullJobType = new GraphQLObjectType<
  IRepositoryPullJob,
  Context
>({
  name: "RepositoryPullJob",
  fields: {
    jobId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.jobId,
    },
    ...RepositoryPullType.toConfig().fields,
  },
});
