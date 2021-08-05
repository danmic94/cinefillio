import { useState } from "react";
import { generateArrayOfYears } from "../../helpers";

const years = generateArrayOfYears();
const types = ["Movie", "Series", "Episode"];

function SearchFields(props) {
  const [searchedTitle, setSearchedTitle] = useState("war");
  const [searchedYear, setSearchedYear] = useState("2021");
  const [searchedType, setSearchedType] = useState("movie");
  const [sortFilters, setFilters] = useState({ titleAsc: true, yearAsc: true });

  return (
    <div className="row filters-wrapper">
      <div className="col-md-2">
        <input
          id="searchedTitle"
          htmlFor="searchedTitle"
          type="text"
          className="form-control"
          placeholder="Movie Title"
          aria-label="Title"
          onChange={(e) => setSearchedTitle(e.target.value)}
          value={searchedTitle}
        />
      </div>
      <div className="col-md-2">
        <select
          className="form-select"
          id="searchedYear"
          value={searchedYear}
          onChange={(e) => setSearchedYear(e.target.value)}
        >
          <option value="2021">2021</option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-2">
        <select
          className="form-select"
          id="setSearchedType"
          value={searchedType}
          onChange={(e) => setSearchedType(e.target.value)}
        >
          {types.map((type) => (
            <option value={type.toLowerCase()} key={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-2">
        <button
          type="submit"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            props.handleSearchParams(searchedTitle, searchedYear, searchedType);
          }}
        >
          Submit
        </button>
      </div>
      <div className="col-md-2 offset-md-2 sort-group-wrapper">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setFilters({
                titleAsc: !sortFilters.titleAsc,
                yearAsc: sortFilters.yearAsc,
              });
            }}
          >
            <i
              className={
                sortFilters.titleAsc ? "bi bi-sort-up" : "bi bi-sort-down"
              }
            ></i>
            <span className="sort-text">Title</span>
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setFilters({
                titleAsc: sortFilters.titleAsc,
                yearAsc: !sortFilters.yearAsc,
              });
            }}
          >
            <i
              className={
                sortFilters.yearAsc ? "bi bi-sort-up" : "bi bi-sort-down"
              }
            ></i>
            <span className="sort-text">Year</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFields;
