import { Component } from "react";
import SearchParamsContext from "./SearchParamsContext";

class SearchParamsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedTitle: "Star Wars",
      searchedYear: "",
      searchedType: "movie",
      titleAsc: true,
      yearAsc: true,
    };
    this.setTitle = this.setTitle.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setType = this.setType.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  setTitle(title) {
    this.setState({
      ...this.state,
      searchedTitle: title,
    });
  }

  setYear(year) {
    this.setState({
      ...this.state,
      searchedYear: year,
    });
  }

  setType(type) {
    this.setState({
      ...this.state,
      searchedType: type,
    });
  }

  toggleFilters(title, year) {
    this.setState({
      ...this.state,
      titleAsc: title,
      yearAsc: year,
    });
  }

  render() {
    return (
      <SearchParamsContext.Provider
        value={{
          searchedTitle: this.state.searchedTitle,
          searchedYear: this.state.searchedYear,
          searchedType: this.state.searchedType,
          titleAsc: this.state.titleAsc,
          yearAsc: this.state.yearAsc,
          setSearchedTitle: this.setTitle,
          setSearchedYear: this.setYear,
          setSearchedType: this.setType,
          toggleFilters: this.toggleFilters,
        }}
      >
        {this.props.children}
      </SearchParamsContext.Provider>
    );
  }
}

export default SearchParamsProvider;
