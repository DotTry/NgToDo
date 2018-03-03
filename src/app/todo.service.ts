import {Injectable} from '@angular/core';
import {Todo} from './todo';

//Service for adding, removing, checking each todo item.
@Injectable()
export class TodoService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for todo's
  todos: Todo[] = [];

  constructor() {
    // Instantiate our local storage cache for the list.
    this.todos = (localStorage.getItem('items')===null) ? [] : JSON.parse(localStorage.getItem('items'));
  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    localStorage.setItem('items', JSON.stringify(this.todos)); //update cache.
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
      localStorage.setItem('items', JSON.stringify(this.todos));
      console.log(localStorage.getItem('items'));
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    localStorage.setItem('items', JSON.stringify(this.todos));
    return updatedTodo;
  }



}
