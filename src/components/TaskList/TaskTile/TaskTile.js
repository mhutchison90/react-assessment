import React, { Component } from 'react';
import './TaskTile.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getTaskList, deleteTask, completeTask } from '../../../ducks/reducer';
import { setTaskOnRedux } from '../../../ducks/reducer';

class TaskTile extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      singleTask:[],
      task:[]
    }
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  componentDidMount() {
    this.props.getTaskList();
  }
  deleteTask(id) {
    this.props.deleteTask(id)
  }
  completeTask(id) {
    this.props.completeTask(id)
  }
  setOnDucks(val){
    this.props.setTaskOnRedux(val)
  }

  render() {
    return (
      <div className="TaskTile">
        {this.props.taskList.map((task, i) => {
          return (
            <div key={i} className="TaskTile-Container" id={task.completed ? 'completed' : 'not-completed'}>
              <Link to={`/taskdetails/${task.id}`} >
                {task.title}
              </Link>
              <div className='action-buttons' >
              { task.completed===true ?<button disabled id='complete' onClick={_ => { this.completeTask(task.id) }} >Complete</button> :<button id='complete' onClick={_ => { this.completeTask(task.id) }} >Complete</button>}
                <delete id='delete' onClick={_ => { this.deleteTask(task.id) }} >X</delete>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskList: state.taskList,
    task: state.singleTask
  }
}

const mapDispatchToProps = { 
  setTaskOnRedux: setTaskOnRedux 
}

export default connect(mapStateToProps,{ mapDispatchToProps, getTaskList, deleteTask, completeTask} )(TaskTile);