import './App.css';
import React from "react";
import axios from "axios";
import AddTodo from "./Components/AddTodo";
import TodoItem from "./Components/TodoItem";

class App extends React.Component{

  state = {
    todos :[]
  };

  componentDidMount(){
    axios.get("http://localhost:3333/todos").then((result)=>{

    console.log(result);

    this.setState({
      todos : result.data
    });
    });

  }

  // this function received value from Addtodo component save into the state
  addTodoToState = (text) =>{
    axios.post("http://localhost:3333/todos",  {
      text,//text:text
      completed:false

    }).then((result)=>{
      const newTodos = this.state.todos.concat({
        text: text
      });
  
      this.setState({
        todos:newTodos
      });
    });
  };

  editTodoFromState = (index,newText)=>{
    const todo = this.state.todos[index];

    axios.put("http://localhost:3333/todos/" +todo.id,{
      ...todo,
      text:newText
    }).then(()=>{
      const newTodo = this.state.todos.map((todo,i)=>{
        if(index === i){
          return {
            ...todo,
            text : newText
          }
        }
        return todo;
      });
      this.setState({
        todos:newTodo
      });
    });
    
  };

  toggleComplete = (index) =>{
    const {todos} =this.state;
    const todo = todos[index];
    const newTodos = todos.map((todo,i) =>{
      if(index === i)
      {
        return {
          ...todo,
          completed : !todo.completed
        };
      }

      return todo;
    } );

    axios.put("http://localhost:3333/todos/"+todo.id,{
      
      completed: !todo.completed
    }).then(()=>{
      this.setState({
        todo: newTodos
      });
    })
   
  }

  deleteTodoFromState = index  =>
  {
    const todo = this.state.todos[index];
    axios.delete("http://localhost:3333/todos/" +todo.id).then(()=>{
      const newTodos = this.state.todos.filter((todo,i)=>{
        if(index === i)
        {
          return false;
        }
        return true;
      });
      this.setState({
        todos:newTodos
      });
    });
  };

  render(){
    return(
      <div className="App">

        {this.state.todos.map((todo,index) =>{
          return (<TodoItem
           toggleComplete={this.toggleComplete}
           deleteTodoFromState ={this.deleteTodoFromState}
           editTodoFromState={this.editTodoFromState}
           todo={todo}
           index = {index}
            key={index}/>
          );
        })}
        <AddTodo addTodoToState={this.addTodoToState}/>

      </div>
    );
  }
}

export default App;
