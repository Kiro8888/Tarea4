"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const data = JSON.parse(event.body);

    // Convertir _id a número si es necesario
    data._id = parseInt(data._id);

    console.log(event.body);

    // Cambié la colección de "books" a "authors"
    await client.db("bookstore").collection("authors").insertOne(data);

    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
