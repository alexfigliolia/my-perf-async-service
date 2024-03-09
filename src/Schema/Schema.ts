import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  checkRepositoryPullStatus,
  deleteRepositoryStatsJobs,
  nextRepositoryPullJob,
  nextRepositoryStatsPullJob,
  registerRepositoryPull,
  registerRepositoryStatsPull,
  repositoryPulls,
  repositoryStatsPulls,
  setJobStatus,
  setRepositoryStatsJobStatus,
  subscribeToRepositoryStats,
} from "./Resolvers";
import type { Context } from "./Utilities";

const QueryRoot = new GraphQLObjectType<any, Context>({
  name: "Query",
  fields: () => ({
    nextRepositoryPullJob,
    nextRepositoryStatsPullJob,
    checkRepositoryPullStatus,
  }),
});

const MutationRoot = new GraphQLObjectType<any, Context>({
  name: "Mutation",
  fields: () => ({
    setJobStatus,
    registerRepositoryPull,
    registerRepositoryStatsPull,
    setRepositoryStatsJobStatus,
    subscribeToRepositoryStats,
    deleteRepositoryStatsJobs,
  }),
});

const SubscriptionRoot = new GraphQLObjectType<any, Context>({
  name: "Subscription",
  fields: () => ({
    repositoryPulls,
    repositoryStatsPulls,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
  subscription: SubscriptionRoot,
});
