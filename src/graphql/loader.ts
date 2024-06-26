import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeSchemas } from 'graphql-yoga'
import { mergeResolvers } from "@graphql-tools/merge";
import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema'


const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'), { extensions: ['graphql']})
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.ts'), { extensions: ['ts']})

// export default mergeSchemas({
//     typeDefs: [typesArray],
//     resolvers: mergeResolvers(resolversArray)
// });

export default makeExecutableSchema({
    typeDefs: [typesArray],
    resolvers: mergeResolvers(resolversArray),
});