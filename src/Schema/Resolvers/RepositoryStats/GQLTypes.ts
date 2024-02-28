import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { IRepoStatsPull, IRepoStatsPullJob } from "./types";

export const RepositoryStatsPull = new GraphQLObjectType<
  IRepoStatsPull,
  Context
>({
  name: "RepositoryStatsPull",
  fields: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.id,
    },
    date: {
      type: GraphQLString,
      resolve: pull => pull.date,
    },
    clone_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.clone_url,
    },
    token: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.token,
    },
    repositoryId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.repositoryId,
    },
    organizationId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.organizationId,
    },
  },
});

export const RepositoryStatsPullJobType = new GraphQLObjectType<
  IRepoStatsPullJob,
  Context
>({
  name: "RepositoryStatsPullJob",
  fields: {
    jobId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.jobId,
    },
    ...RepositoryStatsPull.toConfig().fields,
  },
});
