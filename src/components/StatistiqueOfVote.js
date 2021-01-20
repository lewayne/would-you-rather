import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Button, ProgressBar} from 'react-bootstrap'

const CurrentUserVote = () => (
  <p style={{ color: 'green', fontWeight: "bolder"}}>  #My Vote# </p>
);

export class StatistiqueOfVote extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    let optionOneColor = '#C0C0C0',  optionTwoColor = '#C0C0C0';
    if (optionOneVotes > optionTwoVotes) {
        optionOneColor = '#808080'
    } else if (optionTwoVotes > optionOneVotes) {
        optionTwoColor = '#808080'
    }

    return (
      <Fragment>
        <h3>  Results:   Would you rather  </h3>
        <div style={{ backgroundColor: optionOneColor, padding: 10 }}>       
          <div style={{ fontWeight: 'bold' }}>   
             {userVote === 'optionOne' && <CurrentUserVote />}
             <h3>{question.optionOne.text} </h3> 
          </div>
          {optionOneVotes} out of {votesTotal} votes
          <ProgressBar animated now={((optionOneVotes / votesTotal) * 100).toFixed(2)} />
        </div>

        <div style={{ backgroundColor: optionTwoColor, marginTop: 18, padding: 10}} >            
          <div style={{ fontWeight: 'bold' }}> 
              {userVote === 'optionTwo' && <CurrentUserVote />}
              <h3>{question.optionTwo.text} </h3> 
          </div>
          {optionTwoVotes} out of {votesTotal} votes
          <ProgressBar animated now={((optionTwoVotes / votesTotal) * 100).toFixed(2)} />
        </div>

        <Button style={{margin:"0 auto", display:"block", marginTop : 10}} onClick={this.handleClick}> Back </Button>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return { user };
}

export default withRouter(connect(mapStateToProps)(StatistiqueOfVote));