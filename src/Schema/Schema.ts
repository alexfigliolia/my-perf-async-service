import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  nextPullJob,
  registerRepositoryPull,
  registerRepositoryStatsPull,
  repositoryPulls,
  setJobStatus,
} from "./Resolvers";
import type { Context } from "./Utilities";

const QueryRoot = new GraphQLObjectType<any, Context>({
  name: "Query",
  fields: () => ({
    nextPullJob,
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
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
  subscription: SubscriptionRoot,
});
