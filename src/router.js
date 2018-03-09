import React from 'react';
import { Route, Switch } from 'react-router-dom';


// --IMPORTING COMPONTENTS--
import Home from './components/Home/Home'
import TaskDetails from './components/TaskList/TaskDetails/TaskDetails'




export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/taskdetails/:id' component={TaskDetails} />
    </Switch>
)