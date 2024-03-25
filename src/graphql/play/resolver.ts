import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields"
import { executeStandardQuery } from "../../utils/database/queryUtils";
import { GraphQLError } from 'graphql'

export default {
  Query: {
    PlayQuery: async (parent: any, args: any, context: any, info: GraphQLResolveInfo) => {
      const fieldsList = Object.keys(graphqlFields(info));
      fieldsList.splice(fieldsList.indexOf("__typename"), 1);
      return await executeStandardQuery(fieldsList, 'public."Play"', args);
    }
  }
};
