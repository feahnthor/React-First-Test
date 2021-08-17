import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Homepage, Aboutpage, Header, Login, RestaurantList} from './App'; //Accepts returns from our page if export is in {}
// that means they are "Named exports" which can import multiple things https://upokary.com/difference-between-export-const-vs-export-default-in-react/

ReactDOM.render(
  <Router>
    <Header/>
    <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/about' component={Aboutpage}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/restaurant-list' component={RestaurantList}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);


//***** This is what helped me understand the structure of files in this app */
// https://www.pluralsight.com/guides/understanding-links-in-reactjs


// *1. Header needs to be outside the <Switch> so that it renders with each route
// https://stackoverflow.com/questions/62356414/re-render-header-in-reactjs
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

