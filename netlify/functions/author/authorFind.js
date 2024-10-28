"use strict"

const mongoPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb');  // Importa ObjectId si usas ObjectId para _id

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
     return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await mongoPromise;
    const id = event.path.split("/").reverse()[0];  // Si el ID es ObjectId, no uses parseInt
    
    const authors = await client.db("bookstore").collection("authors").find({_id: new ObjectId(id)}).toArray();  // Cambié a la colección "authors"
    
    return { statusCode: 200, headers, body: JSON.stringify(authors)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
