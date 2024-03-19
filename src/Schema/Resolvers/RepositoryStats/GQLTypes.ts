import type { GraphQLFieldConfigArgumentMap } from "graphql";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import {
  BaseCloneJobType,
  CloneJobArguments,
  ScheduleType,
} from "Schema/Resolvers/Jobs/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { IRepoStatsPull, IRepoStatsPullJob } from "./types";

export const RepositoryStatsPull = new GraphQLObjectType<
  IRepoStatsPull,
  Context
>({
  name: "RepositoryStatsPull",
  fields: {
    ...BaseCloneJobType.toConfig().fields,
    date: {
      type: GraphQLString,
      resolve: pull => pull?.date?.toISOString?.() ?? pull.date,
    },
    range: {
      type: ScheduleType,
      resolve: pull => pull.range,
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

export const RepositoryStatsJobArguments: GraphQLFieldConfigArgumentMap = {
  ...CloneJobArguments,
  date: {
    type: GraphQLString,
  },
};
