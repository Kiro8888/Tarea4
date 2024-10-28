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
    // Cambié a 'authorstore' y ajusté el request para reflejar que estamos trabajando con autores
    const request = `{'method':'UPDATE','entity':'author','id':${id},'body':${event.body}}`;
    await channel.sendToQueue("authorstore", Buffer.from(request));

    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
