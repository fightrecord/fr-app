module.exports = input => {
  console.log('HelpIntentHandler');

  const speech = [
    'Fighter Record has data on over 4000 Muay Thai and Kickboxing atheletes.',
    'You can ask me about a fighter by saying phrases like "What do you know about Juan Cervantes?"',
    'or "Ask Fight Record about Jordan Watson?',
    'or "What is Dan Edwards fight record?".'
  ];

  const speechText = speech.join(' ');

  return input.responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .withSimpleCard('Hello World', speechText)
    .getResponse();
};