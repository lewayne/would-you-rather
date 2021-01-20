//import { RECEIVE_USERS,  ADD_ANSWER_TO_USER,  ADD_QUESTION_TO_USER } from '../actions/users';
import { RECEIVE_USERS, USER_ANSWER_QUESTION, ADD_USER_QUESTION } from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:  return { ...state, ...action.users   };
    case USER_ANSWER_QUESTION: const { authUser, qid, answer } = action;
      return { ...state,  [authUser]: {
                 ...state[authUser],
                 answers: { ...state[authUser].answers, [qid]: answer  }
               }
            };
    case ADD_USER_QUESTION:  const { id, author } = action;
      return {  ...state,  [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };
    default: return state;
  }
}
