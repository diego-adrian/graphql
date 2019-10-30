const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const app = express();
const PORT = process.env.PORT || 3131;

mongoose.connect('mongodb://localhost/courseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true
    }))
    
    app.listen(PORT, () => {
      console.log('------------------------------------');
      console.log(`Servidor escuchando por el puerto ${PORT}`);
      console.log('Base de datos existosamente conectado')
      console.log('------------------------------------');
    });
  })
  .catch(err => console.log(err.message))