import React, { Component } from 'react';
import './TaskDetails.css';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { getTaskList, deleteTask, completeTask, patchTask } from '../../../ducks/reducer';

class TaskDetails extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      singleTask: [],
      title: '',
      description: '',
      completed: null,
      ogTitle: '',
      ogDescription: '',
      ogCompleted: null,
      id: 0,
      redirect: false
    }
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
    this.complete = this.complete.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this.props.getTaskList().then(() => {
      let oneTask = this.props.taskList.filter((value) => {
        return value.id == this.props.match.params.id ? true : false;
      });
      this.setState({
        ogTitle: oneTask[0].title,
        ogDescription: oneTask[0].description,
        ogCompleted: oneTask[0].completed,
        title: oneTask[0].title,
        description: oneTask[0].description,
        completed: oneTask[0].completed,
        id: oneTask[0].id
      });
    });
  }
  complete() {
    this.props.completeTask(this.props.match.params.id).then(() =>
      this.setState({
        completed: true,
        redirect: true
      })
    )
  }

  save() {
    const id = this.state.id
    const body = { id: this.state.id, title: this.state.title, description: this.state.description }
    this.props.patchTask(id, body)
      .then(() => this.setState({ redirect: true }))
  }

  cancel() {
    this.setState({
      title: this.state.ogTitle,
      description: this.state.ogDescription,
      completed: this.state.ogCompleted,
    })
  }

  delete() {
    this.props.deleteTask(this.props.match.params.id)
      .then(() => this.setState({ redirect: true }))
  }
  render() {
    const h3Style = {
      color: 'deepskyblue'
    }
    const warning = {
      backgroundColor: 'indianred',
      color: 'white'
    }
    const saveColor = {
      backgroundColor: 'deepskyblue',
      color: 'white'
    }
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/' />;
    }
    return (
      <div className="TaskDetails">
        TaskDetails  <br />
        <Link to='/' > <strong>{'< BACK TO TASKS'}</strong> </Link><br />
        <button onClick={_ => { this.complete() }}>Complete</button><br />

        <h3 style={h3Style}> Title: </h3>

        <textarea name='title' type='text' value={this.state.title} onChange={(e) => {
          this.setState({
            title: e.target.value
          })
        }} />
        <h3 style={h3Style}>Description:</h3>
        <textarea name='description' type='text' value={this.state.description} onChange={(e) => {
          this.setState({
            description: e.target.value
          })
        }} />
        <br />

        <button style={saveColor} onClick={_ => { this.save() }} >Save</button>
        <button onClick={_ => { this.cancel() }} >Cancel</button>
        <button style={warning} onClick={_ => { this.delete() }}>Delete</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskList: state.taskList
  }
}

export default connect(mapStateToProps, { getTaskList, deleteTask, completeTask, patchTask })(TaskDetails);