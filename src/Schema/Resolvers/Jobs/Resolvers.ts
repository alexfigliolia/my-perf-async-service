import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt } from "graphql";
import type { Context } from "Schema/Utilities";
import { SchemaBuilder } from "Schema/Utilities";
import { JobController } from "./Controller";
import type { IJob } from "./types";

export const pullNextJob: GraphQLFieldConfig<
  IJob,
  Context,
  Record<string, never>
> = {
  type: SchemaBuilder.nonNull(GraphQLInt),
  args: {},
  resolve: () => {
    return JobController.enqueueNext();
  },
};
