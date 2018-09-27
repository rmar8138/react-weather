import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import shortid from "shortid";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchList from "./components/SearchList";
import WeatherCard from "./components/WeatherCard";
import TodaysWeather from "./components/TodaysWeather";
import WelcomeMessage from "./components/WelcomeMessage";

//#529bba #2476ac

const Container = styled.div`
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    url(./img/bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.div`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  height: 50px;
  padding: 1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin-right: auto;
  }
`;

const ScaleButton = styled.button`
  cursor: pointer;
  margin-right: 1rem;
  background-color: inherit;
  color: white;
  font-size: 1rem;
  border: none;
  transition: all 0.2s;

  :focus {
    outline: none;
  }

  :hover {
    color: #2476ac;
  }
`;

const Main = styled.div`
  flex: 0 0 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherCardContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  state = {
    isCelsius: true,
    title: "",
    todaysWeather: {
      the_temp: null,
      applicable_date: null,
      weather_state_name: null,
      weather_state_abbr: null
    },
    nextFiveDaysWeather: [],
    searchResults: null
  };

  searchLocation = query => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`
    )
      .then(results => results.json())
      .then(results => {
        console.log(results);
        if (results.length === 1) {
          // if only one search result, immediately search for weather
          this.getWeather(results[0].woeid);
        } else if (results.length > 1) {
          // if more than one search result, display list of results
          this.setState({
            searchResults: results
          });
        } else {
          // if no results, display message
        }
      });
  };

  getWeather = woeid => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
    )
      .then(weather => weather.json())
      .then(weather => {
        console.log(weather);
        this.setState({
          title: weather.title,
          todaysWeather: {
            the_temp: this.state.isCelsius
              ? Math.round(weather.consolidated_weather[0].the_temp)
              : this.convertToFarenheit(
                  weather.consolidated_weather[0].the_temp
                ),
            applicable_date: moment(
              weather.consolidated_weather[0].applicable_date,
              "YYYY-MM-DD"
            ).format("dddd MMMM Do"),
            weather_state_name:
              weather.consolidated_weather[0].weather_state_name,
            weather_state_abbr:
              weather.consolidated_weather[0].weather_state_abbr
          },
          nextFiveDaysWeather: weather.consolidated_weather
            .filter((day, index) => {
              // do not return todays weather
              return index !== 0;
            })
            .map(day => {
              return {
                the_temp: this.state.isCelsius
                  ? Math.round(day.the_temp)
                  : this.convertToFarenheit(day.the_temp),
                applicable_date: moment(
                  day.applicable_date,
                  "YYYY-MM-DD"
                ).format("ddd Do MMM"),
                weather_state_name: day.weather_state_name,
                weather_state_abbr: day.weather_state_abbr
              };
            }),
          searchResults: null
        });
      });
  };

  clickSearchItem = location => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
    )
      .then(results => results.json())
      .then(results => {
        this.getWeather(results[0].woeid);
      });
  };

  changeScale = () => {
    if (this.state.todaysWeather.the_temp) {
      // only change temp when data is rendered
      this.setState(
        prevState => ({
          isCelsius: !prevState.isCelsius
        }),
        () => {
          if (this.state.isCelsius) {
            // if true, convert to celsius
            this.setState(prevState => ({
              todaysWeather: {
                ...prevState.todaysWeather,
                the_temp: this.convertToCelsius(
                  prevState.todaysWeather.the_temp
                )
              },
              nextFiveDaysWeather: prevState.nextFiveDaysWeather.map(day => {
                return {
                  ...day,
                  the_temp: this.convertToCelsius(day.the_temp)
                };
              })
            }));
          } else {
            // if not true, convert to farenheit
            this.setState(prevState => ({
              todaysWeather: {
                ...prevState.todaysWeather,
                the_temp: this.convertToFarenheit(
                  prevState.todaysWeather.the_temp
                )
              },
              nextFiveDaysWeather: prevState.nextFiveDaysWeather.map(day => {
                return {
                  ...day,
                  the_temp: this.convertToFarenheit(day.the_temp)
                };
              })
            }));
          }
        }
      );
    }
  };

  convertToCelsius = temp => Math.round((temp - 32) / 1.8);

  convertToFarenheit = temp => Math.round(temp * 1.8 + 32);

  render() {
    return (
      <Container>
        <Nav>
          <h1>React Weather</h1>
          <div>
            <ScaleButton onClick={this.changeScale}>Change scale</ScaleButton>
          </div>
          <SearchBar searchLocation={this.searchLocation} />
          {this.state.searchResults && (
            <SearchList
              searchResults={this.state.searchResults}
              clickSearchItem={this.clickSearchItem}
            />
          )}
        </Nav>
        <Main>
          {this.state.todaysWeather.the_temp ? (
            <TodaysWeather
              title={this.state.title}
              weather={this.state.todaysWeather}
              isCelsius={this.state.isCelsius}
            />
          ) : (
            <WelcomeMessage />
          )}
        </Main>
        <WeatherCardContainer>
          {this.state.nextFiveDaysWeather.map(day => {
            return (
              <WeatherCard
                isCelsius={this.state.isCelsius}
                the_temp={day.the_temp}
                applicable_date={day.applicable_date}
                weather_state_name={day.weather_state_name}
                weather_state_abbr={day.weather_state_abbr}
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
