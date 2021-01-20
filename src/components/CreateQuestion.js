import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Form, Button, Spinner} from 'react-bootstrap';

import { handleSaveQuestion } from '../actions/questions';

export class CreateQuestion extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired
  };
  
  state = {
    validSubmit: false,
    isLoading: false,
    optionOne: '',
    optionTwo: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { optionOne, optionTwo } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(optionOne, optionTwo, authUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        optionOne: '',
        optionTwo: ''
      });
      this.setState({ validSubmit: true });
    });
  };

  render() {
    console.log('this.props', this.props);
    const disabled = this.state.optionOne === '' || this.state.optionTwo === '';

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }

    return (
        <div>
              <h3> <strong>Would you rather...</strong> </h3>
                {this.state.isLoading && (
                   <Spinner animation="border" role="status">
                      <span className="sr-only">Updating...</span>
                   </Spinner>
                )}
                
                <Form>
                    <Form.Group controlId="optionOne">
                      <Form.Label>Option One</Form.Label>
                      <Form.Control id="optionOne"  placeholder="Enter option one..."  value={this.state.optionOne}  
                            onChange={this.handleChange}  required />
                    </Form.Group>

                    <Form.Group controlId="optionTwo">
                      <Form.Label>Option two</Form.Label>
                      <Form.Control id="optionTwo"  placeholder="Enter option one..."  value={this.state.optionTwo}  
                            onChange={this.handleChange}  required />
                    </Form.Group>

                    <Button style = {{ margin: "0 auto", display: "block", marginTop: 10}} 
                            onClick={this.handleSubmit} disabled={disabled}> Submit </Button>
                </Form>    
          </div>
      
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(  mapStateToProps, { handleSaveQuestion } )(CreateQuestion);
