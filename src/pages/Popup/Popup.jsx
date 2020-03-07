import React, { Component } from 'react';
import './Popup.css';
const Api_Key = '946d35d566e27385156baad2b0536fa2';

class Popup extends Component {
  state = {
    country: '',
    res: [],
    temp: null,
    weather: null,
  };

  getWeather = async (e) => {
    e.preventDefault();
    const { country } = this.state;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country},IN&APPID=${Api_Key}&units=metric`;
    let res = await fetch(url);
    this.setState({ res });
    res = await res.json();
    console.log('res', res);
    this.setState({ weather: res.weather[0].main });
    this.setState({ temp: res.main.temp });
  };
  render() {
    const { country, weather, temp } = this.state;
    return (
      <>
        <h1>Get Weather</h1>
        <form className="flex" onSubmit={this.getWeather}>
          <input
            autoFocus
            onChange={({ target: { value } }) => {
              this.setState({ country: value });
            }}
            type="text"
            value={country}
            placeholder="City of india"
          />
          <button onClick={this.getWeather}>Get</button>
        </form>
        {weather && temp && (
          <div className="desc">
            <div>
              Weather : <span>{weather}</span>
            </div>
            <div>
              Temperature : <span>{temp}</span> ˚C
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Popup;
