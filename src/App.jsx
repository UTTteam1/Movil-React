import React, { Component } from 'react';
import './App.css'
import axios from 'axios';
const url = 'https://jsonplaceholder.typicode.com/todos';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ todos: data })
      console.log(this.state.todos)
     })
  }
  render() {

    return ( <>
      <div className="container">
       <div className="col-xs-8">
       <h1> Axios</h1>
       {this.state.todos.map((todo) => (
         <div className="card">
          <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
           </div>
         </div>
       ))}
       </div>
      </div>
      </>
   );
    
  }

} 

export default App;