import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields"
import { executeStandardQuery } from "../../utils/database/queryUtils";

export default {
  Query: {
    PlayQuery: async (parent: any, args: any, context: any, info: GraphQLResolveInfo) => {
      const fieldsList = Object.keys(graphqlFields(info));
      return await executeStandardQuery(fieldsList, 'public."Play"', args);
    }
  }
};
