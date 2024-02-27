import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { RepositoryPullType } from "Schema/Resolvers/RepositoryPull/GQLTypes";
import { StatusType } from "Schema/Resolvers/Status/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { IJob } from "./types";

export const JobType = new GraphQLObjectType<IJob, Context>({
  name: "Job",
  fields: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: job => job.id,
    },
    status: {
      type: SchemaBuilder.nonNull(StatusType),
      resolve: job => job.status,
    },
    created_at: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: job => job.created_at,
    },
    repositoryPull: {
      type: RepositoryPullType,
      resolve: job => job.repositoryPull,
    },
  },
});
