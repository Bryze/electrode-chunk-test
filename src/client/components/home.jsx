/*
 * This is a demo component the Eletrode app generator included
 * to show using Milligram CSS lib and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import { connect } from "react-redux";
import "../styles/raleway.css";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import electrodePng from "../images/electrode.png";
import DemoStates from "./demo-states";
import DemoPureStates from "./demo-pure-states";
import { DemoButtons } from "./demo-buttons";
import { Nav } from "./nav";
import { inputName } from '../actions';

//

//
import config from "electrode-ui-config";
//

//

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  // componentDidMount() {
  //   fetch('https://sell24engine-qa.ninja24.in/city/config/2').then(resp => {
  //     return resp.json();
  //   }).then((result) => {
  //     const { data } = result;
  //     this.setState({
  //       loaded: true
  //     });
  //     this.props.dispatch(inputName('abc'))
  //   })
  // }

  render() {
    return (
      <div styleName={"custom.container"}>
        { 
          this.state.loaded ? <div>Loaded</div> : <div>No Loaded</div>
        }
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(Home);
