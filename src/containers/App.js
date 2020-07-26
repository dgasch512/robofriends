import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField, requestRobots } from '../redux/actions';

const mapStateToProps = state => {
  return {
    searchfield: state.searchRobots.searchfield,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()) }
}


class App extends Component { 
  // Removed with Redux
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: []
  //     searchfield: ''
  //   }
  // }

  componentDidMount() {
    this.props.onRequestRobots();
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(users => {this.setState({ robots: users })});
  };

  // Removed with redux
  // onSearchChange = (event) => {
  //   this.setState( { searchfield: event.target.value } )
  // }

  render() {
    // removed with redux
    // const { robots } = this.state;

    // Added with redux
    const { searchfield, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

   return isPending ? 
       <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots}/> 
            </ErrorBoundary>
          </Scroll>
        </div>
      )
    };
  }


export default connect(mapStateToProps, mapDispatchToProps)(App);
