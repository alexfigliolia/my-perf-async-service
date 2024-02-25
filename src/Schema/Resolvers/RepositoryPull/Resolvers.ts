import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLString } from "graphql";
import { RequestMethodType } from "Schema/Resolvers/RequestMethod/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { RepositoryPullController } from "./Controller";
import type { ICreatePull } from "./types";

export const registerRepositoryPull: GraphQLFieldConfig<
  { id: number },
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
    requestMethod: {
      type: SchemaBuilder.nonNull(RequestMethodType),
    },
    organizationId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
  },
  resolve: (_, args) => {
    return RepositoryPullController.registerJob(args);
  },
};
