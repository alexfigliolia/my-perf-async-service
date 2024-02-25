import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  pullNextJob,
  registerRepositoryPull,
  registerRepositoryStatsPull,
} from "./Resolvers";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    pullNextJob,
  }),
});

const MutationRoot = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    registerRepositoryPull,
    registerRepositoryStatsPull,
  }),
});

// const SubscriptionRoot = new GraphQLObjectType({
//   name: "Subscription",
//   fields: () => ({
//     installationSetup,
//   }),
// });

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
  // subscription: SubscriptionRoot,
});
