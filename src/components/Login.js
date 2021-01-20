import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';
import {Card, Form, Spinner, Button} from 'react-bootstrap'

export class Login extends Component {
  state = {
    loading: false
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    const loading = this.state.loading

    return (
      <Card style = {{ width: '100%', marginTop:30, marginLeft: 'auto', marginRight: 'auto', display: 'inline-block'}}>
        <Card.Header> Who are you ? </Card.Header>
        <Card.Body>
            {loading === true && (
              <Spinner animation="grow" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            <br/>
            <ConnectedLoginForm onLoading={this.handleLoading} />
        </Card.Body>
      </Card>
    );
  }
  
}


class LoginForm extends Component {
  static propTypes = {
    onLoading: PropTypes.func.isRequired
  };

  state = {
    value: ''
  };

  onChange(e) {
    this.setState({value: e.target.value})
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    const { onLoading, setAuthUser } = this.props;
    const authUser = this.state.value;
    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => setAuthUser(authUser));
  };
  infoUsers = () => {
    const { users } = this.props;

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };
  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;
    return (
              <Form onSubmit={this.handleSubmit} >
                  <h2 color="green"> Sign In </h2>
                  <Form.Group>
                      <Form.Control as="select" size="lg" onChange={this.onChange.bind(this)}>
                          <option> Select a user </option>
                          {this.infoUsers().map(user => (
                              <option key={user.key} value={user.value} > {user.value}   </option>
                          ))}
                      </Form.Control>
                  </Form.Group>  
                      <Button disabled={disabled} onClick={this.handleSubmit}>Login</Button>
              </Form>
      
    );
  }
}

const ConnectedLoginForm = connect(mapStateToProps, { setAuthUser } )(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default Login;