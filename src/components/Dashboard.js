import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCard from './UserCard';
import {Tab, Tabs, Container, CardColumns} from 'react-bootstrap'

export class Dashboard extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired
  };
  render() {
    const { userQuestionData } = this.props;

    return (
      <Container fluid="lg">
                    <Tabs id="controlled-tab-example" >
                        <Tab eventKey="Unanswered" title="Unanswered"> 
                            <CardColumns>
                                {userQuestionData.answered.map(question => (
                                      <UserCard key={question.id} question_id={question.id}  unanswered={true} />
                                ))}
                            </CardColumns>
                        </Tab>
                        <Tab eventKey="Answered" title="Answered"> 
                            <CardColumns>
                                {userQuestionData.unanswered.map(question => (
                                        <UserCard key={question.id} question_id={question.id} unanswered={false} />
                                ))}
                            </CardColumns>
                        </Tab>
                        
                    </Tabs>
        </Container>
      );
  }
}

function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Dashboard);
