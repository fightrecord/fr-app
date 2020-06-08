module.exports = input => {
  console.log('LaunchRequestHandler');

  const speech = [
    'Hello from Fight Record, you can ask me about fighters by name.',
    'Try saying "Ask Fight Record about Juan Cervantes".',
  ];

  const speechText = speech.join(' ');

  return input.responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .withSimpleCard('Hello from Fight Record', speechText)
    .getResponse();
};