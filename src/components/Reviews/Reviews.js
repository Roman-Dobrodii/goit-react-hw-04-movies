import React, { Component } from "react";
import API from "../../services/api";
import { withRouter } from "react-router-dom";

import styles from "./Reviews.module.css";

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const id = this.props.id;

    await API.getReviews(id).then(({ data }) =>
      this.setState({
        reviews: data.results,
      })
    );
  }

  render() {
    const { reviews } = this.state;
    return reviews.length > 0 ? (
      <ul className={styles.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <p className={styles.reviewAuthor}>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p> We don't have any reviews for this movie.</p>
    );
  }
}

export default withRouter(Reviews);
