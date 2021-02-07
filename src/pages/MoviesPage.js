import React, { Component } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import getQueryParams from "../utils/getQueryString";

import styles from "./MoviesPage.module.css";

export default class MoviesPage extends Component {
  state = {
    searchQuery: "",
    searchList: [],
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);

    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = (query) => {
    API.searchMovie(query).then(({ data }) => {
      this.setState({
        searchList: data.results,
        searchQuery: "",
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  search = async (e, query) => {
    query = this.state.searchQuery;
    e.preventDefault();

    const { location, history } = this.props;
    history.push({ ...location, search: `query=${query}` });
  };

  render() {
    const { searchList } = this.state;

    return (
      <>
        <form onSubmit={this.search} className={styles.searchForm}>
          <input type="text" name="search" onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>

        <ul className={styles.searchList}>
          {searchList.map((item) => (
            <Link
              key={item.id}
              to={{
                pathname: `${this.props.match.url}/${item.id}`,
                state: {
                  from: this.props.location,
                },
              }}
            >
              <li>{item.title}</li>
            </Link>
          ))}
        </ul>
      </>
    );
  }
}
