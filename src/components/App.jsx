import React, {Component} from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button, Container, Row, Col } from 'reactstrap';
import { connect } from  'react-redux';
import { addReminder, deleteReminder } from '../actions';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    }

  }

  handleChange(value) {
    this.setState({
      text: value
    })
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className='list-group-item'>
                <div className='list-item'>{reminder.text} <Button className='list-item delete-button' onClick={() => this.deleteReminder(reminder.id)}>
                  &#x2715;
                </Button></div>

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
    console.log('delete Reminder in application', id);
    console.log('this.props', this.props);
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
