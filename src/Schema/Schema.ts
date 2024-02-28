import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  nextRepositoryPullJob,
  nextRepositoryStatsPullJob,
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
  }),
});

const MutationRoot = new GraphQLObjectType<any, Context>({
  name: "Mutation",
  fields: () => ({
    setJobStatus,
    registerRepositoryPull,
    registerRepositoryStatsPull,
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
