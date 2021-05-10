import React from "react";

class AddTodo extends React.Component{

    state = {
        todotext : ""
    };

    submitHandler = (event) =>{
        event.preventDefault(); //it is used to prevent browser from reload

        this.props.addTodoToState(this.state.todotext);

        // this empty the text field
        this.setState({
            todotext : ""
        });
    }

    changeTodoText = (event) =>{
        this.setState({
            todotext : event.target.value
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text" onChange={this.changeTodoText} value={this.state.todotext}/>
                    <button type="submit">Add Todo</button>
                </form>
            </div>
        )
    }
}

export default AddTodo;
