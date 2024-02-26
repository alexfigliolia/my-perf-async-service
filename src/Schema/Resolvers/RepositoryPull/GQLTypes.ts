import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { PlatformType } from "Schema/Resolvers/Platform/GQLTypes";
import { RequestMethodType } from "Schema/Resolvers/RequestMethod/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { IRepositoryPull } from "./types";

export const RepositoryPullType = new GraphQLObjectType<
  IRepositoryPull,
  Context
>({
  name: "RepositoryPull",
  fields: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    api_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    token: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    currentPage: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    pageSize: {
      type: SchemaBuilder.nonNull(GraphQLInt),
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
});

export const RepositoryPullJobType = new GraphQLObjectType({
  name: "RepositoryPullJob",
  fields: {
    jobId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    ...RepositoryPullType.toConfig().fields,
  },
});
