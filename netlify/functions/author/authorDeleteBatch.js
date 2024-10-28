"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb');  // Importa ObjectId si usas ObjectId para _id

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const id = event.path.split("/").reverse()[0];  // No se hace parseInt si usas ObjectId
    
    await client.db("bookstore").collection("authors").deleteOne({_id: new ObjectId(id)});  // Cambié a la colección "authors"
    
    return { statusCode: 200, headers, body: 'Author deleted successfully' };
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
