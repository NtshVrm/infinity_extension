/* eslint-disable no-unused-expressions */
import {
  faPencil,
  faPowerOff,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "./info.css";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default function Info() {
  const searchBar = useRef("");
  const focusInput = useRef("");
  const todoInput = useRef("");
  const [focus, setFocus] = useState("");
  const [focusDisplay, setFocusDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const [todoDisplay, setTodoDisplay] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();

  const [weatherData, setWeatherData] = useState({
    location: {
      name: "",
      region: "",
      country: "",
    },
    temperature: 0,
    icon: "",
  });

  function todoHandler() {
    todoInput.current.value &&
      setTodoList([
        ...todoList,
        { _id: uuid(), name: todoInput.current.value, todoCheck: true },
      ]);
  }

  useEffect(() => {
    getLocation();
  }, []);

  async function getWeather(latitude, longitude) {
    let request = "";
    latitude && longitude
      ? (request = `http://api.weatherapi.com/v1/current.json?key=05c5b06880884ecd9e1163032220204&q=${latitude},${longitude}&aqi=yes`)
      : (request = `http://api.weatherapi.com/v1/current.json?key=05c5b06880884ecd9e1163032220204&q=Bangalore&aqi=yes`);
    try {
      const res = await axios.get(request);
      setWeatherData({
        location: {
          name: res.data.location.name,
          region: res.data.location.region,
          country: res.data.location.country,
        },
        temperature: res.data.current.temp_c,
        icon: res.data.current.condition.icon,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const success = (position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  };

  const error = () => {
    getWeather();
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div className="info-container banner">
      <div className="header">
        <div class="searchbar">
          <div class="search-logo">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            class="search-input"
            type="text"
            value={search}
            ref={searchBar}
            onChange={() => setSearch(searchBar.current.value)}
          />
          <div className="clear-icon" onClick={() => setSearch("")}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>
        <div className="weather">
          <div className="weather-temperature">
            <img
              src={weatherData.icon}
              alt="weather-icon"
              className="weather-icon"
            />
            {weatherData.temperature} &deg;
          </div>
          <div className="weather-location">
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="time">
          <div>
            {hour}:{minute}
          </div>
        </div>
        <div className="user-message">Good Evening, Name</div>
        <div className="user-question">What's your main focus for today?</div>
        <div className="user-focus">
          {focus !== "" && focusDisplay ? (
            <>
              <div className="focus-title">TODAY</div>
              <label className="focus-item">
                <input
                  type="checkbox"
                  onChange={() => setChecked((prev) => !prev)}
                />
                <div className={`${checked ? "strike" : ""}`}>{focus}</div>
                <FontAwesomeIcon icon={faPencil} className="edit-icon" />
              </label>
            </>
          ) : (
            <input
              type="text"
              className="focus-input"
              ref={focusInput}
              onKeyPress={(event) =>
                event.key === "Enter"
                  ? (setFocusDisplay(true), setFocus(focusInput.current.value))
                  : ""
              }
            />
          )}
        </div>
      </div>
      <div className="footer">
        <div className="user-logout">
          <FontAwesomeIcon icon={faPowerOff} />
        </div>
        <div className="quote">"RANDOM QUOTE"</div>
        <div className="todo" onClick={() => setTodoDisplay((prev) => !prev)}>
          TODO
        </div>
        {todoDisplay ? (
          <div className="todo-expand">
            <div className="todo-header">
              <div className="todo-title">Today</div>
              <div className="todo-hide" onClick={() => setTodoDisplay(false)}>
                <FontAwesomeIcon icon={faX} className="clear-icon" />
              </div>
            </div>
            <div className="todo-items">
              {todoList !== [] &&
                todoList.map((item) => {
                  return (
                    <label
                      className={`items ${item.todoCheck ? "" : "strike"}`}
                    >
                      <input
                        type="checkbox"
                        onChange={() => {
                          const newList = todoList.map((obj) => {
                            return obj._id === item._id
                              ? { ...obj, todoCheck: !item.todoCheck }
                              : obj;
                          });
                          setTodoList(newList);
                        }}
                      />
                      {item.name}
                    </label>
                  );
                })}
            </div>
            <div className="todo-footer">
              <input
                type="text"
                className="search-input"
                placeholder="Add todo"
                ref={todoInput}
              />
              <button className="add-button" onClick={() => todoHandler()}>
                Add
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
