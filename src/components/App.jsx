import React, {Component} from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button, Container, Row, Col } from 'reactstrap';
import { connect } from  'react-redux';
import { addReminder, deleteReminder, clearAllReminder } from '../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: '',
    }

  }

  handleChange(value) {
    this.setState({
      text: value
    });
  }

  handleDueDate(value) {
    this.setState({
      dueDate: value
    });
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group ReminderList">
        {
          reminders.reverse().map(reminder => {
            let dueDateLeft = moment(new Date(reminder.dueDate)).fromNow();
            let hourLeft = moment(new Date(reminder.dueDate)).diff(moment(), 'days');
            let isOverDue = false;
            let dueDateBg = 'info';

            isOverDue = (hourLeft < 0) ? true : false;
            dueDateBg = (hourLeft <= 2 && hourLeft >= 0) ? 'warning' : dueDateBg;
            dueDateBg = (hourLeft < 0 ) ? 'danger' : dueDateBg;

            return (
              <li key={reminder.id} className={'list-group-item text-white bg-' + dueDateBg}>
                <span className='list-item' disabled={isOverDue}>{reminder.text} <em>overdued</em> {dueDateLeft} <em>{(isOverDue) ? '(overdued)' : ''}</em></span>
                <button type="button" className="close list-item delete-button" aria-label="Close" onClick={() => this.deleteReminder(reminder.id)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            )
          })
        }
      </ul>
    )
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  clearAllReminder() {
    this.props.clearAllReminder();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm='6 mx-auto'>
            <div className='App'>
              <div className='title lead text-center'>My Reminder Pro</div>
              <br/>
              <div>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className='bg-dark text-white'>I Have To!</InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Do Something ..." value={this.state.text} onChange={(e) => this.handleChange(e.target.value)} />
                  <InputGroupAddon addonType="append">
                    <Button color='success' onClick={() => this.addReminder()}>Let's Do It!</Button>
                  </InputGroupAddon>
                </InputGroup>
                <br/>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className='bg-dark text-white'>How About Due Date ?</InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Due Date ???" value={this.state.dueDate} type='datetime-local' onChange={(e) => this.handleDueDate(e.target.value)} />
                </InputGroup>
              </div>
              <br/>
              { this.renderReminders() }
            </div>
            <br/>
            <Button className='pull-right' onClick={() => this.clearAllReminder()}>Clear all!!!</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapDispatchToProps, {addReminder, deleteReminder, clearAllReminder})(App);
