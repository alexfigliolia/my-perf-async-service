import type { GraphQLFieldConfig } from "graphql";
import { GraphQLError, GraphQLInt, GraphQLString } from "graphql";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { Subscriptions } from "Subscriptions";
import { MonthlyStatsPullController } from "./Controller";
import { MonthlyStatsPullJobType } from "./GQLTypes";
import type { ICreateMonthlyPull, IMonthlyStatsPullJob } from "./types";

export const registerMonthlyStatsPull: GraphQLFieldConfig<
  any,
  Context,
  ICreateMonthlyPull
> = {
  type: SchemaBuilder.nonNull(GraphQLInt),
  args: {
    date: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    token: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    email: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    clone_url: {
      type: SchemaBuilder.nonNull(GraphQLString),
    },
    userId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    repositoryId: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
  },
  resolve: async (_, args) => {
    const job = await MonthlyStatsPullController.registerJob(args);
    if (!job.MonthlyUserStatsPull) {
      throw new GraphQLError("Failed to create monthly stats pull");
    }
    Subscriptions.publish("monthlyUserStatsPull", job.MonthlyUserStatsPull);
    return job.id;
  },
};

export const nextMonthlyStatsPullJob: GraphQLFieldConfig<
  any,
  Context,
  Record<string, never>
> = {
  type: SchemaBuilder.nonNull(MonthlyStatsPullJobType),
  resolve: () => {
    return MonthlyStatsPullController.poll();
  },
};

export const monthlyStatsPulls: GraphQLFieldConfig<
  IMonthlyStatsPullJob,
  Context,
  Record<string, never>
> = {
  type: SchemaBuilder.nonNull(MonthlyStatsPullJobType),
  subscribe: () => {
    return Subscriptions.subscribe("monthlyUserStatsPull");
  },
  resolve: job => job,
};
