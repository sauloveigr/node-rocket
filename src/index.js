/*
   cpf - string
   name - string
   id - uuid (universally unique identifier)
   statement - [] (extrato, créditos, débitos, etc)
*/

const express = require("express");
const { v4: uuidv4 } = require("uuid"); // (v4 - números randômicos)

const app = express();

app.use(express.json());
   
const costumers = [];

app.post("/account", (request, response) => {
   const { cpf, name } = request.body;

   const costumerAlreadyExists = costumers.some(
      // some - procura no array e retorna true se existir
      (costumer) => costumer.cpf === cpf
   );

   if (costumerAlreadyExists) {
      return response.status(400).json({ error: "Costumer already exists!" });
   }

   costumers.push({
      cpf,
      name,
      id: uuidv4(),
      statement: [],
   });

   return response.status(201).send(); // status 201 - quando algum dado for criado
});

app.listen(3333);
