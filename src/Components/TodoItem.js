import React from "react";

class TodoItem extends React.Component{

    state = {
        isEditing : false
    };

    toggleEditing = ()=>{
        this.setState({
            isEditing : !this.state.isEditing
        });
    };
    clickHandler = () =>{
        this.props.toggleComplete(this.props.index);
        console.log("click working");
    };

    deleteToDo =() =>{
        this.props.deleteTodoFromState(this.props.index);
    }

    editTodoSubmitHandler = (event) =>{
        event.preventDefault();
        this.props.editTodoFromState(this.props.index,this.newText.value);
        this.toggleEditing();//it reach to the default state it remove input bar and sho text

    };

    render()
    {
        const {todo} = this.props;
        // OR above equal to
        //const todo = this.props.todo;

        if(this.state.isEditing){
            return (
                <li>
                    <form onSubmit={this.editTodoSubmitHandler}>
                        <input type="text" defaultValue={todo.text} ref={(node)=>{
                            this.newText=node;//when we donot use state, we use re in uncontrol satate
                        }}
                        />
                        <button type="submit">Save</button>
                        <button onClick={this.toggleEditing}>Cancel</button>
                    </form>
                </li>
            );
        }

        return(
            <li  
            className={todo.completed? "completed" : ""} >
               <span onClick={this.clickHandler}> {todo.text} </span>
                <span>

                    <button onClick={this.toggleEditing}>Edit</button>
                    <button onClick={this.deleteToDo}>Delete</button>
                </span>
                </li>
        );
    }
}
export default TodoItem;