import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import shortid from "shortid";
import Skycons from "react-skycons";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const Container = styled.div``;

const WeatherCardContainer = styled.div`
  display: flex;
`;

class App extends Component {
  state = {
    display_name: "",
    todaysWeather: {
      temperature: null,
      time: null,
      summary: null,
      icon: null
    },
    weatherData: [],
    keys: {
      locationIQ: "9f09738f970e3b",
      darkSky: "52866a91a32cb415ade6511b94dd8dd6"
    }
  };

  callAPI = location => {
    fetch(
      `https://us1.locationiq.com/v1/search.php?key=${
        this.state.keys.locationIQ
      }&q=${location}&format=json`
    )
      .then(coords => coords.json())
      .then(coords => {
        console.log(coords);
        this.setState({
          display_name: coords[0].display_name.split(",")[0]
        });
        fetch(
          `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${
            this.state.keys.darkSky
          }/${coords[0].lat},${coords[0].lon}?units=si`
        )
          .then(result => result.json())
          .then(result => {
            console.log(result);
            this.setState({
              todaysWeather: {
                temperature: Math.round(result.currently.temperature),
                time: moment.unix(result.currently.time).format("MMM Do YYYY"),
                summary: result.currently.summary,
                icon: result.currently.icon.toUpperCase().replace(/-/g, "_")
              },
              weatherData: result.daily.data.map(day => {
                return {
                  temperatureHigh: Math.round(day.temperatureHigh),
                  temperatureLow: Math.round(day.temperatureLow),
                  time: moment.unix(day.time).format("MMM Do"),
                  icon: day.icon.toUpperCase().replace(/-/g, "_")
                };
              })
            });
          });
      });
  };

  onSubmit = e => {
    e.preventDefault();

    this.callAPI(e.target.elements.location.value);
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.onSubmit}>
          <input name="location" type="text" />
          <button>Search</button>
        </form>
        <div>
          {this.state.display_name ? (
            <div>
              <h1>{this.state.display_name}</h1>
              <h2>{this.state.todaysWeather.temperature}</h2>
              <p>{this.state.todaysWeather.summary}</p>
              <Skycons
                color="black"
                icon={this.state.todaysWeather.icon}
                autoplay
              />
              <p>{this.state.todaysWeather.time}</p>
            </div>
          ) : (
            <div>
              <h1>Weather App</h1>
              <p>Search a location to get started!</p>
            </div>
          )}
        </div>
        <WeatherCardContainer>
          {this.state.weatherData.map(day => {
            return (
              <WeatherCard
                icon={day.icon}
                temperatureHigh={day.temperatureHigh}
                temperatureLow={day.temperatureLow}
                time={day.time}
                key={shortid.generate()}
              />
            );
          })}
        </WeatherCardContainer>
      </Container>
    );
  }
}

export default App;
