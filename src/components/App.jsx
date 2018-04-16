import React, {Component} from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button } from 'reactstrap';
import {connect} from  'react-redux';
import {addReminder} from '../actions';
import {bindActionCreators} from 'redux';

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

  addReminder() {
    this.props.addReminder(this.state.text);
  }

  render() {
    return (
      <div className='App'>
        <div className='title'>My Reminder Pro</div>
        <div>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>I Have To!</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Work To Do..." value={this.state.text} onChange={(e) => this.handleChange(e.target.value)} />
            <InputGroupAddon addonType="append">
              <Button color='success' onClick={() => this.addReminder()}>Let's Do It!</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder},dispatch)
}
export default connect(null, mapDispatchToProps)(App);
