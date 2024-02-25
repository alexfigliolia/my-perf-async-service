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
    },
    status: {
      type: SchemaBuilder.nonNull(StatusType),
    },
    created_at: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    repositoryPull: {
      type: RepositoryPullType,
    },
  },
});
