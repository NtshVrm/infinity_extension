/* eslint-disable no-unused-expressions */
import {
  faMinusCircle,
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
import { useNavigate } from "react-router-dom";

export default function Info() {
  const navigate = useNavigate();
  const searchBar = useRef("");
  const focusInput = useRef("");
  const todoInput = useRef("");
  const [focus, setFocus] = useState("");
  const [focusDisplay, setFocusDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [quote, setQuote] = useState("");
  const [checked, setChecked] = useState(false);

  const [todoDisplay, setTodoDisplay] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const minutes = minute / 10 < 1 ? `0${minute}` : minute;

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
    localStorage.getItem("userName")
      ? ""
      : setTimeout(() => {
          navigate("/");
          window.location.reload(false);
        });
    getLocation();
  });

  useEffect(() => {
    getQuote();
  }, []);

  async function getQuote() {
    try {
      const res = await axios.get(
        "https://api.quotable.io/random?tags=education|faith|wisdom|happiness|inspirational|success|&maxLength=100"
      );
      setQuote(res.data.content);
    } catch (error) {
      console.log(error);
    }
  }
  async function getWeather(latitude, longitude) {
    let request = "";
    latitude && longitude
      ? (request = `https://api.weatherapi.com/v1/current.json?key=05c5b06880884ecd9e1163032220204&q=${latitude},${longitude}&aqi=yes`)
      : (request = `https://api.weatherapi.com/v1/current.json?key=05c5b06880884ecd9e1163032220204&q=Bangalore&aqi=yes`);
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
        <div className="searchbar">
          <div class="search-logo">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <form
            method="get"
            action="https://www.google.com/search"
            className="search-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            <label>
              <input
                type="text"
                name="q"
                placeholder="Google Search"
                className="search-input"
                autocomplete="off"
                value={search}
                ref={searchBar}
                onChange={() => setSearch(searchBar.current.value)}
              />
            </label>
            <div className="clear-icon" onClick={() => setSearch("")}>
              <FontAwesomeIcon icon={faX} />
            </div>
          </form>
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
            {hour}:{minutes}
          </div>
        </div>
        <div className="user-message">
          Good
          {(hour < 4 && " night") ||
            (hour < 12 && " morning") ||
            (hour < 16 && " afternoon") ||
            (hour < 21 && " evening") ||
            "night"}
          , {localStorage.getItem("userName")}!
        </div>
        <div className="user-question">What's your main focus for today?</div>
        <div className="user-focus">
          {focus !== "" && focusDisplay ? (
            <>
              <div className="focus-title">TODAY</div>
              <div className="focus-wrapper">
                <label className="focus-item">
                  <input
                    type="checkbox"
                    onChange={() => setChecked((prev) => !prev)}
                    checked={checked}
                  />
                  <div className={`${checked ? "strike" : ""}`}>{focus}</div>
                </label>
                <FontAwesomeIcon
                  icon={faPencil}
                  className="edit-icon"
                  onClick={() => {
                    setChecked(false);
                    setFocusDisplay((prev) => !prev);
                  }}
                />
              </div>
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
        <div
          className="user-logout"
          onClick={() => localStorage.removeItem("userName")}
        >
          <FontAwesomeIcon icon={faPowerOff} /> Logout
        </div>
        <div className="quote">"{quote !== "" && quote}"</div>
        <div className="todo" onClick={() => setTodoDisplay((prev) => !prev)}>
          TODO
        </div>
        {todoDisplay ? (
          <div className="todo-expand">
            <div className="todo-header">
              <div className="todo-title">Today</div>
              <div
                className="todo-hide"
                onClick={() => {
                  setTodoDisplay(false);
                }}
              >
                <FontAwesomeIcon icon={faMinusCircle} className="clear-icon" />
              </div>
            </div>
            <div className="todo-items">
              {todoList !== [] &&
                todoList.map((item) => {
                  return (
                    <div className="item-wrapper">
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
                          checked={item.todoCheck ? false : true}
                        />
                        {item.name}
                      </label>
                      <FontAwesomeIcon
                        className="delete-icon"
                        icon={faX}
                        onClick={() => {
                          const tempList = todoList
                            .map((obj) => obj)
                            .filter((obj) => obj._id !== item._id);
                          setTodoList(tempList);
                        }}
                      />
                    </div>
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
