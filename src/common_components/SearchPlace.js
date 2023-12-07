import "./SearchPlace.css";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

function SearchPlace({ searchClicked, onFilterChange }) {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    guest: 1,
  });
  const [type, setType] = useState("ALL");

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleDestination = (event) => {
    setDestination(event.target.value);
  };

  const handleSearch = () => {
    const newFilters = {
      city: destination,
      maxGuests: options.guest,
      type: type,
    };

    onFilterChange(newFilters);
  };

  return (
    <div className={searchClicked ? "searchActive" : "search"}>      
      <div className="headerSearchS">
        <div className="headerSearchItemS">
          <i className="fa-solid fa-bed"></i>
          <select value={destination} onChange={handleDestination}>
            <option disabled value="">
              Where are you going?
            </option>
            <option value="Adana">Adana</option>
            <option value="Antalya">Antalya</option>
            <option value="Ankara">Ankara</option>
            <option value="Bursa">Bursa</option>
            <option value="Gaziantep">Gaziantep</option>
            <option value="İstanbul">İstanbul</option>
            <option value="İzmir">İzmir</option>
            <option value="Kayseri">Kayseri</option>
            <option value="Konya">Konya</option>
            <option value="Mersin">Mersin</option>
          </select>
        </div>
        <div className="headerSearchItemS">
          <i className="fa-solid fa-calendar-days"></i>
          <span
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchTextS"
          >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
            dates[0].endDate,
            "dd/MM/yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="dateS"
              minDate={new Date()}
            />
          )}
        </div>
        <div className="headerSearchItemS">
          <i className="fa-solid fa-person"></i>
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchTextS"
          >{`${options.guest} guest`}</span>
          {openOptions && (
            <div className="optionsS">
              <div className="optionItemS">
                <span className="optionTextS">Guest</span>
                <div className="optionCounterS">
                  <button
                    disabled={options.guest <= 1}
                    className="optionCounterButtonS"
                    onClick={() => handleOption("guest", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumberS">{options.guest}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("guest", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="dropdown">
          <i class="fa-solid fa-building"></i>
          <select value={type} onChange={handleChange}>
            <option value="ALL">ALL</option>
            <option value="HOUSE">HOUSE</option>
            <option value="ROOM">ROOM</option>
          </select>
        </div>
        <div className="headerSearchItemS">
          <button className="headerBtnS" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchPlace;
