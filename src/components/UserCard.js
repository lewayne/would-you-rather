import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import TakeVote from './TakeVote';
import StatistiqueOfVote from './StatistiqueOfVote';
import Teaser from './Teaser';

const options = { TEASER: 'TEASER', VOTE: 'VOTE',  STATISTIQUE: 'STATISTIQUE' };
  
  const QuestionContent = props => {
    const { option, question, unanswered } = props;
   
    switch (option) {
      case options.TEASER: return <Teaser question={question} unanswered={unanswered} />;
      case options.VOTE: return <TakeVote question={question} />;
      case options.STATISTIQUE: return <StatistiqueOfVote question={question} />;
      default:  return;
    }
  };

export class UserCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    option: PropTypes.string,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string
  };
  render() {
    const { author, question, option, badPath, unanswered = null } = this.props;

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    return (
      <Card style={{ width: '18rem' }} className="p-3 mr-4">
       <Card.Header>
         <span style = {{ fontWeight: "bolder"}}> {this.props.author && this.props.author.name} asks :</span>
        <Card.Img src={this.props.author && author.avatarURL} style={{ height: '8rem' }} />
       </Card.Header>
        
        <Card.Body>
          <Card.Title> 
              <QuestionContent option={option} question={question} unanswered={unanswered} /> 
           </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}



function mapStateToProps( { users, questions, authUser }, { match, question_id } ) {
  let question,  author,  option, badPath = false;

  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    option = options.TEASER;
  } 
  else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      badPath = true;
    } 
    else {
      author = users[question.author];
      option = options.VOTE;
      if (Object.keys(user.answers).includes(question.id)) {
        option = options.STATISTIQUE;
      }
    }
  }

  return { badPath, question,  author, option  };
}

export default connect(mapStateToProps)(UserCard);
