const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const User = require('./models/User');
const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI, { 
  useCreateIndex: true,
  useNewUrlParser: true 
})
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

const typeDefs = gql`

type Todo {
  task: String
  completed: Boolean
}  

type Query {
  getTodos: [Todo]
}
`;

const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
  } 
});

server.listen().then(({url}) => {
  console.log(`Sever listening ${url}`);
});