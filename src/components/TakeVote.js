import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap'
import { handleSaveQuestionAnswer } from '../actions/users';

export class TakeVote extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  };
  
  state = {
    value: ''
  };

  handleChange = (e)=>{
    this.setState({ value: e.target.value });
  } 


  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { authUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authUser, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const disabled = this.state.value === '' ? true : false;

    return (
      <Fragment>
        <h4>Would you rather ?</h4>
        <Form >
            <Form.Check type="radio" label={question.optionOne.text} name="formHorizontalRadios" 
              value="optionOne" checked={this.state.value === 'optionOne'} onChange={this.handleChange}/>
              <br />
            <Form.Check type="radio" label={question.optionTwo.text} name="formHorizontalRadios" value="optionTwo"
              checked={this.state.value === 'optionTwo'} onChange={this.handleChange}/>
              
            <Button onClick={this.handleSubmit} disabled={disabled} 
                    style = {{ margin: "0 auto", display: "block", marginTop: 10}}>Submit</Button>
        </Form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer } )(TakeVote);
