import React, { Component } from 'react';
import './Home.css';
import AddTask from '../AddTask/AddTask';
import TaskList from '../TaskList/TaskList';
import { connect } from 'react-redux';
import { setTaskOnRedux } from '../../ducks/reducer';


class Home extends Component {
constructor(){
  super();
  this.state={
    singleTask:[],
    taskList:[]
  }
}
  render() {
    return (
      <div className="Home">
        <h1>TO-DO:</h1>
        <hr/>
        <AddTask/>
        <TaskList/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    task: state.singleTask,
    taskList: state.taskList

  }
}

const mapDispatchToProps = { 
  setTaskOnRedux: setTaskOnRedux 
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);