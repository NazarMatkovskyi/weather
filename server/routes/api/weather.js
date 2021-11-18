let express = require('express');
let axios = require('axios');
let dotenv = require('dotenv');
let router = express.Router();

dotenv.config();

const OWM_API_KEY = process.env.OWM_API_KEY,
  OWM_FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';

/* GET weather for 5 days. */
router.get('/', function (req, res) {

  axios.get(`${OWM_FORECAST_ENDPOINT}?q=${req.query.city}&appid=${OWM_API_KEY}&units=metric`)
    .then(owmResponse => {
      res
        .type('json')
        .send(prepareResponse(owmResponse.data, parseInt(req.query.count)));
    })
    .catch(error => {
      res
        .status('404')
        .type('json')
        .send({
          message: 'The city not found. Modify city URL parameter.',
          error: error
        });
    });
});

const prepareResponse = (weather, recordsCount) => {

  let preparedResponse = weather;

  preparedResponse.list = Object
    .keys(weather.list)
    .filter(key => key < recordsCount)
    .map(key => weather.list[key]);

  return preparedResponse;
}

module.exports = router;
