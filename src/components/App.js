import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Login from './Login';
import NavigationBar from './NavigationBar';
import Dashboard from './Dashboard';
import Logout from './Logout';
import UserCard from './UserCard';
import CreateQuestion from './CreateQuestion';
import Leaderboard from './Leaderboard';
import PageNotFound from './PageNotFound';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <NavigationBar />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/createQuestion" component={CreateQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/questions/bad_id" component={PageNotFound} />
                  <Route path="/logout"  component={Logout}/>
                  <Route component={PageNotFound} />
                </Switch>
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Container>
    <Row>
      <Col sm={8}>{children}</Col>
    </Row>
  </Container>
);


function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
