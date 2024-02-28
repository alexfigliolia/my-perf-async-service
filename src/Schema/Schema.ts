import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  monthlyStatsPulls,
  nextMonthlyStatsPullJob,
  nextRepositoryPullJob,
  nextRepositoryStatsPullJob,
  registerMonthlyStatsPull,
  registerRepositoryPull,
  registerRepositoryStatsPull,
  repositoryPulls,
  repositoryStatsPulls,
  setJobStatus,
} from "./Resolvers";
import type { Context } from "./Utilities";

const QueryRoot = new GraphQLObjectType<any, Context>({
  name: "Query",
  fields: () => ({
    nextRepositoryPullJob,
    nextRepositoryStatsPullJob,
    nextMonthlyStatsPullJob,
  }),
});

const MutationRoot = new GraphQLObjectType<any, Context>({
  name: "Mutation",
  fields: () => ({
    setJobStatus,
    registerRepositoryPull,
    registerRepositoryStatsPull,
    registerMonthlyStatsPull,
  }),
});

const SubscriptionRoot = new GraphQLObjectType<any, Context>({
  name: "Subscription",
  fields: () => ({
    repositoryPulls,
    repositoryStatsPulls,
    monthlyStatsPulls,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
  subscription: SubscriptionRoot,
});
