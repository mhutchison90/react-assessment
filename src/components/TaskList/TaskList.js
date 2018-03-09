import React, { Component } from 'react';
import './TaskList.css';
import TaskTile from './TaskTile/TaskTile'


class TaskList extends Component {
  render() {
    return (
      <div className="TaskList">
        <hr/>
        <TaskTile/>
      </div>
    );
  }
}

export default TaskList;
