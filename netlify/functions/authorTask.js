"use strict"

const rabbitPromise = require('./rabbitMQ');

const headers = require('./headersCORS');

const url = 'https://bookstore-tarea4.netlify.app/.netlify/functions/'

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const channel = await rabbitPromise();
    let message = await channel.get("bookstore",{'noAck':true});
    while (message) {
      const request = JSON.parse(message.content.toString());
      switch (request.method) {
        case "DELETE":
          await fetch(url+'authorDeleteBatch/'+request.id, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}});
          break;
        case "UPDATE":
          await fetch(url+'authorUpdateBatch/'+request.id, {
            headers: {"Content-type": "application/json"},
            method: "PUT", body: JSON.stringify(request.body)});
          break;
        case "INSERT":
          await fetch(url+'authorInsertBatch', {
            headers: {"Content-type": "application/json"},
            method: "POST",body: JSON.stringify(request.body)});
          break;
      }
      message = await channel.get("bookstore",{'noAck':true});
    }
    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};