import { GraphQLEnumType } from "graphql";

export const RequestMethodType = new GraphQLEnumType({
  name: "RequestMethod",
  values: {
    GET: {
      value: "GET",
    },
    POST: {
      value: "POST",
    },
  },
});
