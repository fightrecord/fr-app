module.exports = input => {
  console.log('CancelAndStopIntentHandler');
  const speechText = 'Goodbye!';

  return handlerInput.responseBuilder
    .speak(speechText)
    .withSimpleCard('Goodbye!', speechText)
    .withShouldEndSession(true)
    .getResponse();
};