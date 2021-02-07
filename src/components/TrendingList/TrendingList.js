import React, { Component } from "react";
import API from "../../services/api";
import { Link, withRouter } from "react-router-dom";

import styles from "./TrendingList.module.css";
// import MovieList from "../MovieList/MovieList";

class TrendingList extends Component {
  state = {
    trendingList: [],
  };

  async componentDidMount() {
    await API.getTrending().then((trendingList) => {
      this.setState((prevState) => ({
        trendingList: [...prevState.trendingList, ...trendingList],
      }));
    });
  }

  render() {
    const { trendingList } = this.state;
    return (
      // <MovieList list={trendingList} />
      <ul className={styles.trendingList}>
        {trendingList.map((item) => (
          <li key={item.id}>
            <Link
              to={{
                pathname: `/movies/${item.id}`,
              }}
            >
              {item.title ?? item.original_name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default withRouter(TrendingList);
