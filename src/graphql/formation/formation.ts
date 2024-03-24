import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields"
import { executeStandardQuery } from "../../utils/database/queryUtils";

export default {
  Query: {
    FormationQuery: async (parent: any, args: any, context: any, info: GraphQLResolveInfo) => {
      const fieldsList = Object.keys(graphqlFields(info));
      return await executeStandardQuery(fieldsList, 'public."Formation"', args);
    }
  }
};
