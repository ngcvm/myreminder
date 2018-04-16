import React, {Component} from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button, Container, Row, Col } from 'reactstrap';
import { connect } from  'react-redux';
import { addReminder, deleteReminder } from '../actions';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: null,
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
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className='list-group-item'>
                <span className='list-item'>{reminder.text}</span>
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
    this.props.addReminder(this.state.text);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
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
                    <InputGroupText>I Have To!</InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Do Something ..." value={this.state.text} onChange={(e) => this.handleChange(e.target.value)} />
                  <InputGroupAddon addonType="append">
                    <Button color='success' onClick={() => this.addReminder()}>Let's Do It!</Button>
                  </InputGroupAddon>
                </InputGroup>
                <br/>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>How About Due Date ?</InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Due Date ???" value={this.state.dueDate} type='datetime-local' onChange={(e) => this.handleDueDate(e.target.value)} />

                </InputGroup>
              </div>
              <br/>
              { this.renderReminders() }
            </div>
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
export default connect(mapDispatchToProps, {addReminder, deleteReminder})(App);
