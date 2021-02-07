import React, { Component, lazy, Suspense } from "react";
import { withRouter, NavLink, Route, Switch } from "react-router-dom";
import API from "../services/api";
// import Cast from "../Components/Cast/Cast";
// import Reviews from "../Components/Reviews/Reviews";
// import Button from "../Components/Button/Button";

import styles from "./MovieDeteilsPage.module.css";

const Cast = lazy(() => import("../components/Cast/Cast"));
const Reviews = lazy(() => import("../components/Reviews/Reviews"));
const Button = lazy(() => import("../components/Button/Button"));

class MovieDetailsPage extends Component {
  state = {
    movie: {},
    title: "",
    score: "",
    overview: "",
    genres: [],
    img: "",
    from: "",
    search: "",
  };
  async componentDidMount() {
    const id = this.props.match.params.movieId;

    if (this.props.location.state?.from) {
      this.setState({
        from: this.props.location.state.from.pathname,
        search: this.props.location.state.from.search,
      });
    }

    await API.getMovieInfo(id).then(({ data }) =>
      this.setState({
        movie: data,
        title: data.title,
        genres: data.genres,
        score: data.popularity,
        overview: data.overview,
        img: data.poster_path,
      })
    );
  }

  render() {
    const { img, title, movie, score, overview, genres } = this.state;
    const id = this.props.match.params.movieId;
    const { match } = this.props;

    const from = this.state.from;
    const search = this.state.search;

    let release_year;

    if (movie.release_date) {
      release_year = movie.release_date.split("-")[0];
    }

    return (
      <div>
        <Button from={from} search={search} />

        <div className={styles.movieInfoWrapper}>
          <img
            className={styles.poster}
            src={img && `https://image.tmdb.org/t/p/original/${img}`}
            alt={title}
            width="250"
          />

          <div>
            <h2>
              {title} ({release_year})
            </h2>

            <p>User score: {Math.round(score)}%</p>

            <h3>Overview</h3>
            <p>{overview}</p>

            <h4>Genres</h4>
            <ul className={styles.genresList}>
              {genres.map((genre) => (
                <li className={styles.genre} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <p>Additional information</p>
          <ul>
            <NavLink
              to={{
                pathname: `${match.url}/cast`,
              }}
              className={styles.additionalItem}
            >
              Cast
            </NavLink>
            <NavLink
              to={{
                pathname: `${match.url}/reviews`,
              }}
              className={styles.additionalItem}
            >
              Reviews
            </NavLink>
          </ul>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              path={`${match.url}/cast`}
              render={(props) => <Cast {...props} id={id} />}
            />
            <Route
              path={`${match.url}/reviews`}
              render={(props) => <Reviews {...props} id={id} />}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(MovieDetailsPage);
