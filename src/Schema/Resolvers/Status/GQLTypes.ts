import { GraphQLEnumType } from "graphql";

export const StatusType = new GraphQLEnumType({
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
  },
});
