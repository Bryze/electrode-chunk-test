import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Nav } from "./nav";
import { inputName, inputTextarea, selectOption } from "../actions";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import demoStyle from "../styles/demo1.css"; // eslint-disable-line no-unused-vars

class Demo1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: { value: "" },
      textarea: { value: "" },
      selectedOption: { value: "0-13" }
    };
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div styleName={"custom.container"}>
       Mobile
      </div>
    );
  }
}

Demo1.propTypes = {
  username: PropTypes.string,
  textarea: PropTypes.string,
  selectedOption: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    username: state.username.value,
    textarea: state.textarea.value,
    selectedOption: state.selectedOption.value
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(Demo1);
