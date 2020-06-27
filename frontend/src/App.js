import React, {Component} from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component'

// Class component with state
class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
    // Temos que fazer isso pois, inicialmente, a classe nao conhece a funcao  
    // this.handleChange = this.handleChange.bind(this);

  }

  // componentDidMount() {
  //   fetch('http://127.0.0.1:5000/monster')
  //   .then(response => response.json())
  //   .then(users => console.log(users));
  // }

  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters:users}));
  }


  // Arrow functions sao inseridas no contexto da classe em que sao definidas, automaticamente
  // Entao "this" será conhecido em qualquer parte da classe 
  handleChange = (e) => {
    this.setState({searchField: e.target.value}) 
    console.log(this.state)
  }
  

  render() {

    const { monsters, searchField } = this.state;
    // Mesma coisa  
    //const monsters = this.state.monsters;
    //const searchField = this.state.searchField;
    
    // Passa uma funcao booleana para o filter
    const filteredMonsters = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchField.toLowerCase())
      )

    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        
        {/* e.target: Retorna o proprio elemento na tela */ }
        {/* e.target.value: Retorna a propriedade "value" ou o valor do elemento */ }
        {/* this.setState eh assincrono, ou seja, nao toma atua imediatamente */ }
        {/* Eh necessario fazer um callback para para que isso ocorra */ }

       { /*<input type='search' 
          placeholder='search monsters' 
          onChange={e => {
            this.setState({searchField: e.target.value }, () => console.log(this.state)
            )}}

        />*/
        }
        
        <SearchBox placeholder='search monsters' 
          handleChange = {this.handleChange}
        />
        <CardList monsters={filteredMonsters}>         
        </CardList>
       
      </div>
    );
  }
}

export default App;
