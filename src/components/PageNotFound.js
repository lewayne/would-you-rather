import React, { Component } from 'react';
import {Container} from 'react-bootstrap'

export class PageNotFound extends Component {
  render() {
    return (
      <Container textAlign="center">
        <h3>Page Not Found - 404</h3>
      </Container>
    );
  }
}

export default PageNotFound;