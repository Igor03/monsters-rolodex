import React, {Component} from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component';

// Class component with state
class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters:[]
    };
  }

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response => response.json())
  //   .then(users => console.log(users));
  // }

  
  componentDidMount() {
    fetch('http://127.0.0.1:5000/monster')
    .then(response => response.json())
    .then(users => this.setState({monsters:users}));
  }

  render() {
    return (
      <div className="App">
        <CardList monsters={this.state.monsters}>         
        </CardList>
       
      </div>
    );
  }
}

export default App;
