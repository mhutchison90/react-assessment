import React, { Component } from 'react';
import './AddTask.css';
import { connect } from 'react-redux';
import { postNewTask } from '../../ducks/reducer';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      title: ''
    }
    this.addNewTask = this.addNewTask.bind(this);
  }

  addNewTask() {
    const body = { title: this.state.title }
    this.props.postNewTask(body)
          .then((res) => {
            this.setState({
              title:''
            })
        })
  }

  render() {
    return (
      <div className="AddTask">
        <input name='title' type='text' value={this.state.title} onChange={(e) => {
          this.setState({
            title: e.target.value
          })
        }} /><br/>
        {this.state.title.length === 0 ? <button disabled onClick={this.addNewTask}>Add New To-do</button>: <button  onClick={this.addNewTask}>Add New To-do</button>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newTask: state.title
  }
}
export default connect(mapStateToProps, { postNewTask })(AddTask);
