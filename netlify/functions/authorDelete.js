"use strict"

const headers = require('./headersCORS');
const rabbitPromise = require('./rabbitMQ');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const id = parseInt(event.path.split("/").reverse()[0]);

    const channel = await rabbitPromise();
    const request = `{'method':'DELETE','entity':'author','id': ${id} }`;
    await channel.sendToQueue("authorstore", Buffer.from(request));  // Cambié la cola a 'authorstore'

    return { statusCode: 200, headers, body: 'Author deleted successfully' };
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
