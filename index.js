import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {resolvers} from "./Graphql/resolvers.js"
import  {typeDefs}  from "./Graphql/typeDefs.js";
import { connectDb } from "./db.js";

const app = express();
const httpServer = http.createServer(app)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginDrainHttpServer({httpServer})]
})
await server.start()
connectDb()
app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {context: async({req})=>({token: req.headers.token})})
    
)

await new Promise(resolve =>httpServer.listen({port:4000}, resolve))
console.log(`🚀 Server ready at http://localhost:4000/`);