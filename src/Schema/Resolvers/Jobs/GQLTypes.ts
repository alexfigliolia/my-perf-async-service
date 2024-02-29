import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { RepositoryPullType } from "Schema/Resolvers/RepositoryPull/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { IJob } from "./types";

export const JobStatusType = new GraphQLEnumType({
  name: "JobStatus",
  values: {
    complete: {
      value: "complete",
    },
    failed: {
      value: "failed",
    },
    pending: {
      value: "pending",
    },
    inprogress: {
      value: "inprogress",
    },
  },
});

export const JobType = new GraphQLObjectType<IJob, Context>({
  name: "Job",
  fields: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
      resolve: job => job.id,
    },
    status: {
      type: SchemaBuilder.nonNull(JobStatusType),
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
