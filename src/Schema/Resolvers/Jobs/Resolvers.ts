import type { GraphQLFieldConfig } from "graphql";
import { GraphQLBoolean, GraphQLInt } from "graphql";
import { JobStatusType } from "Schema/Resolvers/Jobs/GQLTypes";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { JobController } from "./Controller";
import type { IJobStatus } from "./types";

export const setJobStatus: GraphQLFieldConfig<boolean, Context, IJobStatus> = {
  type: SchemaBuilder.nonNull(GraphQLBoolean),
  args: {
    id: {
      type: SchemaBuilder.nonNull(GraphQLInt),
    },
    status: {
      type: SchemaBuilder.nonNull(JobStatusType),
    },
  },
  resolve: async (_, args) => {
    await JobController.setStatus(args);
    return true;
  },
};
