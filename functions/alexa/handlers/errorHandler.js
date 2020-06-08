module.exports = (input, error) => {
  if (error) {
    console.log(`Error handled: ${error.message}`);
  }

  return input.responseBuilder
    .speak('Sorry, I can\'t understand the command. Please say again.')
    .reprompt('Sorry, I can\'t understand the command. Please say again.')
    .getResponse();
};