import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLString } from "graphql";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { RepositoryStatsController } from "./Controller";
import type { IRegisterRepoStats } from "./types";

export const registerRepositoryStatsPull: GraphQLFieldConfig<
  number,
  Context,
  IRegisterRepoStats
> = {
  type: SchemaBuilder.nonNull(GraphQLInt),
  args: {
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
    return job.id;
  },
};
