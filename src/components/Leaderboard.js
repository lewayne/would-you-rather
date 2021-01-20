import React, { Component, Fragment } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Image, Badge} from 'react-bootstrap'


export class Leaderboard extends Component {
  static propType = {
    leaderboardData: PropType.array.isRequired
  };
  render() {
    const { users, leaderboardData } = this.props;
    console.log("leaderboardData leaderboardData")
    console.log(leaderboardData)

    console.log("users");
    console.log(users);
    return (
      <Fragment>
        {leaderboardData.map((user) => (
          <div key={user.id}>
            <Container style={{margin:"15px"}}>
              <Row>
                <Col >
                  <Image src={user.avatarURL} rounded />
                </Col>
                <Col>
                <h3> {user.name} </h3>
                  <Row>
                    <Col width={12}>Answered questions</Col>
                    <Col width={4}>{user.answerCount}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col width={12}>Created questions</Col>
                    <Col width={4}>{user.questionCount}</Col>
                  </Row>
                </Col>
                <Col>
                  <div>
                    <h5>Score</h5>
                    <div>
                      <div> 
                        <h1><Badge>{user.questionCount + user.answerCount}</Badge></h1>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
                <hr/>
          </div>
        ))}
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
 
  return {
    users,
    leaderboardData
  };
}

export default connect(mapStateToProps)(Leaderboard);