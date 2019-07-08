const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Importando typeDefs y resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// Importando Env Variables y Modelos de mongoose
require('dotenv').config({ path: '.env' });
const User = require('./models/User');
const Post = require('./models/Post');

// Conectaando a la base de datos
mongoose.connect(process.env.MONGO_URI, { 
  useCreateIndex: true,
  useNewUrlParser: true 
})
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

// Crear el servidor de Apollo/Graphql usando typeDefs, resolvers y modelos
const server = new ApolloServer({
  typeDefs,
  resolvers,  
  context: {
    User,
    Post
  } 
});

// Inicianilizando el servidor
server.listen().then(({url}) => {
  console.log(`Sever listening ${url}`);
});