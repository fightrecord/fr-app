const express = require('express');
const bodyParser = require('body-parser');
const Alexa = require('ask-sdk-core');
const {
  SkillRequestSignatureVerifier,
  TimestampVerifier
} = require('ask-sdk-express-adapter');

const errorHandler = require('./error');
const launchRequestHandler = require('./launchRequest');
const intentHandlers = require('./intents');

const app = express();
app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {
    req.rawBody = buf.toString();
  }
}));

app.post('/alexa', async (req, res) => {
  const skillBuilder = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
      launchRequestHandler,
      ...intentHandlers,
      errorHandler
    );
  const skill = skillBuilder.create();

  console.log(req.body, req.headers)

  try {
    await new SkillRequestSignatureVerifier().verify(req.rawBody, req.headers);
    await new TimestampVerifier().verify(req.rawBody);

    const response = await skill.invoke(req.body);

    console.log(response);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/alexa', (_, res) => res.send('OK'));

module.exports = app;
