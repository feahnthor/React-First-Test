// import with {} or not depends on the number of functions and classes
import './App.css'
import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Aboutpage from './components/about';
import Login from './components/login';
import RestaurantList from './components/restaurant-list';
import {HookTest} from './components/hooktest';

//save state
//https://www.reddit.com/r/reactjs/comments/ovtomu/keeping_state_when_using_react_router/


const Header = () => {

  return (
    <header className="sticky-top">    
      <nav className="navbar navbar-expand navbar-dark foo-test">
        <Link to='/' className="navbar-brand">WanderingInn</Link>
        <div className="navbar-nav mr-auto">
          
          <li className="nav-item myTest">
            Tsetd
          </li>
          <Link to='/login' className="nav-item myTest">Login</Link>
          <Link to='/hooktest' className="nav-item hooktest">HookTest</Link>
          <Link className="nav-item myTest" to="/restaurant-list">Restaurant List</Link>
          <div>
            <form className="d-flex">
              <label htmlFor="productSearch">Search</label>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
  };

const Homepage = () => {
  return (
    <div>
      <h1 className="myTest">Homepage</h1>
      <Link to='/about'>Go to Aboutpage</Link>
      <HookTest />
      
    </div>
  )
};

export {Homepage, Aboutpage, Header, Login, RestaurantList};
