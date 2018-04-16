import {ADD_REMINDER, DELETE_REMINDER} from '../constants/constants';

const reminder = (action) => {
  return {
    text: action.text,
    id: Math.random()
  }
}

const removeById = (state = [], action) => {
  return {
    text: ''
  }
}

const reminders = (state = [], action) => {
  let reminders = null;

  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      console.log('reducers - reminders as state', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = [...state, reminder(action)];
      return reminders;
    default:
      return state;
  }
}

export default reminders;
