import { saveQuestionAnswer } from '../utils/_DATA';
import { addAnswerToQuestion } from '../actions/questions';
import {showLoading, hideLoading} from 'react-redux-loading';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';


export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

function addAnswerToUser(authUser, qid, answer) {
  return {
    type: USER_ANSWER_QUESTION,
    authUser,
    qid,
    answer
  };
}

export function handleSaveQuestionAnswer(authUser, qid, answer) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(addAnswerToUser(authUser, qid, answer));
    dispatch(addAnswerToQuestion(authUser, qid, answer));
    dispatch(hideLoading());

    return saveQuestionAnswer(authUser, qid, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_USER_QUESTION,
    id,
    author
  };
}
