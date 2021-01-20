import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {Button} from 'react-bootstrap'

export class Teaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired,
  };

  state = {
    viewPoll: false
  };

  handleClick = () => {
      this.setState({
         viewPoll : true
      })
  };

  render() {
    const { question, unanswered } = this.props;
    const buttonContent = unanswered === true ? 'Answer Question' : 'Results'
    const buttonColor = buttonContent === 'Answer Question' ?  'royalblue' : 'deepskyblue'

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    
    return (
      <Fragment>
          <p style={{color: buttonColor, fontWeight: "bolder"}}> Would you rather ? </p>
          <p style={{ textAlign: 'center' }}> {question.optionOne.text}   <br />  or...  </p>
          
          <Button style = {{ margin: "0 auto", display: "block", marginTop: 10, backgroundColor: buttonColor}} onClick={this.handleClick}>
                {buttonContent}
          </Button>
      </Fragment>
    );
  }
}

export default  Teaser;