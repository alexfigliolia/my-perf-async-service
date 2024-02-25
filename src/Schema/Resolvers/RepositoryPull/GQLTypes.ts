import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { RequestMethodType } from "../RequestMethod/GQLTypes";
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
    requestMethod: {
      type: SchemaBuilder.nonNull(RequestMethodType),
    },
    organizationId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
  },
});
