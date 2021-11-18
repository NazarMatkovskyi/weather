import React from 'react';
import axios from 'axios';
import { prepareWeatherForTable } from '../../helpers/openWeatherMap';
import { validateNestedField } from '../../helpers/utility';
import './App.scss';
import Table from '../Table/Table/Table';
import Search from '../Search/Search';
import WeatherOverview from '../Weather/Overview/Overview';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherList: {},
      currentWeather: {},
      cityInfo: {},
      searchCityName: 'Lviv',
      wrongCityName: false
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
  }

  componentDidMount() {
    this.updateWeather();
  }

  updateWeather() {
    axios.get(process.env.REACT_APP_WEATHER_DOMAIN + "api/weather?city=" + this.state.searchCityName + "&count=8")
      .then(response => {
        this.setState({
          weatherList: response.data.list,
          currentWeather: response.data.list[0],
          cityInfo: response.data.city,
          wrongCityName: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ wrongCityName: true });
      });
  }

  handleSearchChange(event) {
    this.setState({
      searchCityName: event.target.value,
      wrongCityName: false
    })
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.updateWeather();
  }

  render() {

    const description = validateNestedField(this.state.currentWeather, 'weather', '0', 'description');
    const weatherIconCode = validateNestedField(this.state.currentWeather, 'weather', '0', 'icon');
    const temperature = validateNestedField(this.state.currentWeather, 'main', 'temp');

    return (
      <div className="weather-app">
        <div className="grid">

          <div className="grid__item">
            <p className="weather-app__help-msg">Please, enter city name:</p>
          </div>

          <div className="grid__item">
            <Search
              onSubmit={this.handleSearchSubmit}
              name="searchCityName"
              value={this.state.searchCityName}
              validDataFlag={!this.state.wrongCityName}
              onChange={this.handleSearchChange}
              autoFocus="true" />
          </div>

          <div className="grid__item">
            <WeatherOverview
              cityName={this.state.cityInfo.name}
              description={description}
              iconCode={weatherIconCode}
              temperatureCelsius={temperature} />
          </div>

          <div className="grid__item">
            <Table columns={prepareWeatherForTable(this.state.weatherList)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
