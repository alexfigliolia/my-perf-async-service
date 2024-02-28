import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { IMonthlyStatsPull, IMonthlyStatsPullJob } from "./types";

export const MonthlyStatsPullType = new GraphQLObjectType<
  IMonthlyStatsPull,
  Context
>({
  name: "MonthlyStatsPull",
  fields: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.id,
    },
    clone_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.clone_url,
    },
    token: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.token,
    },
    userId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.userId,
    },
    repositoryId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.repositoryId,
    },
    email: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.email,
    },
    date: {
      type: SchemaBuilder.nonNull(GraphQLString),
      resolve: pull => pull.date,
    },
  },
});

export const MonthlyStatsPullJobType = new GraphQLObjectType<
  IMonthlyStatsPullJob,
  Context
>({
  name: "MonthlyStatsPullJob",
  fields: {
    jobId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: pull => pull.jobId,
    },
    ...MonthlyStatsPullType.toConfig().fields,
  },
});
