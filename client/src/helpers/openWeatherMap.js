//prepare OWM data for table
export const prepareWeatherForTable = weatherList => {
  let infoColumn = {
    time: 'Time',
    data: 'Data (d.m.y)',
    temp: 'Temperature (°C)',
    pressure: 'Pressure (mbar)',
    humidity: 'Humidity (%)',
    windSpeed: 'Wind speed (m/s)'
  }

  let dataColumns = Object
    .keys(weatherList)
    .map(key => {
      return {
        time: weatherList[key].dt_txt.split(' ')[1].slice(0, -3),
        data: transformDateFormat(weatherList[key].dt_txt.split(' ')[0]),
        temp: weatherList[key].main.temp,
        pressure: weatherList[key].main.pressure,
        humidity: weatherList[key].main.humidity,
        windSpeed: weatherList[key].wind.speed
      }
    });

  return [infoColumn, ...dataColumns];
}

export const transformDateFormat = (data) => {
  let day = data.split('-')[2];
  let month = data.split('-')[1];
  let year = data.split('-')[0];
  return day + '.' + month + '.' + year;
}

export const getIconUrlByCode = iconCode => {
  return "http://openweathermap.org/img/w/" + iconCode + ".png";
}

export default { prepareWeatherForTable, transformDateFormat, getIconUrlByCode }