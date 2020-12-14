import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';

import typeDefs from './app/graphql/typeDefs';
import resolvers from './app/graphql/resolvers';
import authConfig from '../src/config/auth';

dotenv.config();

const verifyToken = token => {
    try {
        if (token) {
            return verify(token, authConfig.secret, function(err, decoded) {
                return decoded.usuario;
            });
        }
        return null
    } catch (error) {
        return null
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        return { usuario: verifyToken(token.replace('Bearer', '')) };
      },
});

        
mongoose.connect(process.env.DATABASE_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('Database connected!'));

        
server.listen().then(({ url }) => { console.log(`Server started at ${url}`); });