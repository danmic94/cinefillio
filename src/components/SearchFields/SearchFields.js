import { useContext, useState } from "react";
import SearchParamsContext from "../../context/SearchParamsContext";
import { generateArrayOfYears } from "../../helpers";

const years = generateArrayOfYears();
const types = ["Movie", "Series", "Episode"];

function SearchFields(props) {
  const searchParamsContext = useContext(SearchParamsContext);
  const {
    searchedTitle,
    searchedYear,
    searchedType,
    titleAsc,
    yearAsc,
    setSearchedTitle,
    setSearchedYear,
    setSearchedType,
    toggleFilters,
  } = searchParamsContext;


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
          <option value=""> - No year - </option>
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
              toggleFilters(!titleAsc, yearAsc);
              props.handleTitleSort(!titleAsc);
            }}
          >
            <i
              className={
                titleAsc ? "bi bi-sort-up" : "bi bi-sort-down"
              }
            ></i>
            <span className="sort-text">Title</span>
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              toggleFilters(titleAsc, !yearAsc);
              props.handleYearSort(!yearAsc);
            }}
          >
            <i
              className={
                yearAsc ? "bi bi-sort-up" : "bi bi-sort-down"
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
