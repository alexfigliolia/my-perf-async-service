import type { GraphQLFieldConfig } from "graphql";
import { GraphQLBoolean, GraphQLInt } from "graphql";
import { StatusType } from "Schema/Resolvers/Status/GQLTypes";
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
      type: SchemaBuilder.nonNull(StatusType),
    },
  },
  resolve: async (_, args) => {
    await JobController.setStatus(args);
    return true;
  },
};
