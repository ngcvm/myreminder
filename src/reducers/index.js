import {ADD_REMINDER, DELETE_REMINDER, CLEAR_ALL} from '../constants/constants';

const reminder = (action) => {
  let { text, dueDate } = action;
  return {
    id: Math.random(),
    text,
    dueDate
  }
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
}


const reminders = (state = [], action) => {
  let reminders = null;
  state = (localStorage.getItem('reminders') != null) ? JSON.parse(localStorage.getItem('reminders')) : state;

  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      localStorage.setItem('reminders', JSON.stringify(reminders));
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      localStorage.setItem('reminders', JSON.stringify(reminders));
      return reminders;
    case CLEAR_ALL:
      reminders = [];
      localStorage.setItem('reminders', JSON.stringify(reminders));
      return reminders;
    default:
      return state;
  }
}

export default reminders;
