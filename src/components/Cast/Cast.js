import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../services/api";

import styles from "./Cast.module.css";

class Cast extends Component {
  state = {
    cast: [],
  };
  async componentDidMount() {
    const id = this.props.id;
    await API.getMovieCast(id).then(({ data }) =>
      this.setState({
        id: id,
        cast: data.cast,
      })
    );
  }
  render() {
    const { cast } = this.state;

    return (
      <>
        <ul className={styles.castList}>
          {cast.map((item) => (
            <li key={item.credit_id}>
              <img
                src={
                  item.profile_path &&
                  `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                }
                alt={item.name}
                width="75"
              />
              <p>{item.name}</p>
              <p>{item.character}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withRouter(Cast);
