import React, { Component } from "react";
import styles from "./Button.module.css";
import { withRouter } from "react-router-dom";

class Button extends Component {
  handleGoBack = () => {
    if (this.props.from) {
      if (this.props.search) {
        this.props.history.push(`${this.props.from}${this.props.search}`);
      }
    } else return this.props.history.push("/");
  };

  render() {
    return (
      <div className={styles.buttonWrapper}>
        <button type="button" onClick={this.handleGoBack}>
          Go back
        </button>
      </div>
    );
  }
}

export default withRouter(Button);
