import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./info.css";

export default function Info() {
  const searchBar = useRef("");
  const [search, setSearch] = useState("");

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
      </div>
      <div className="content">CONTENT</div>
      <div className="footer">Footer</div>
    </div>
  );
}
