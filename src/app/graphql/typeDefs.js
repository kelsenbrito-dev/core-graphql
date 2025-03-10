import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const typeArray = fileLoader(path.join(__dirname, '**', '*.gql'));
const typeDefs = mergeTypes(typeArray);

export default typeDefs;