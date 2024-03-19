import type { GraphQLFieldConfigArgumentMap } from "graphql";
import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { RepositoryPullType } from "Schema/Resolvers/RepositoryPull/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import type { BaseCloneJob, IJob } from "./types";

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

export const ScheduleType = new GraphQLEnumType({
  name: "Schedule",
  values: {
    once: {
      value: "once",
    },
    daily: {
      value: "daily",
    },
    weekly: {
      value: "weekly",
    },
    monthly: {
      value: "monthly",
    },
    yearly: {
      value: "yearly",
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
    schedule: {
      type: SchemaBuilder.nonNull(ScheduleType),
      resolve: job => job.schedule,
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

export const CloneJobArguments: GraphQLFieldConfigArgumentMap = {
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
};

export const BaseCloneJobType = new GraphQLObjectType<BaseCloneJob, Context>({
  name: "BaseCloneJob",
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
