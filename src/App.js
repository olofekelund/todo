import React from 'react';
import store from 'store'
import './App.css';
import ToDo from './components/to-do'

class App extends React.Component {
  state = {
    toDos: []
  }

  constructor(props) {
    super(props)

    this.addToDo = this.addToDo.bind(this)
    this.removeToDo = this.removeToDo.bind(this)
    this.addToDoItem = this.addToDoItem.bind(this)
    this.removeToDoItem = this.removeToDoItem.bind(this)
  }

  componentDidMount() {
    this.setState({ toDos: store.get('toDos') ? store.get('toDos') : [] })
  }

  updateLocalStorage() {
    store.set('toDos', this.state.toDos)
  }

  addToDo() {
    this.setState({
      toDos: [...this.state.toDos, {
        title: 'To do...',
        items: [{
          value: 'do work',
          isDone: false
        }]
      }]
    }, this.updateLocalStorage)
  }

  removeToDo(index) {
    var toDos = this.state.toDos

    if (index !== -1) {
      toDos.splice(index, 1)
      this.setState({ toDos }, this.updateLocalStorage)
    }

  }

  editTitle(index, title) {
    var toDos = this.state.toDos
    toDos[index].title = title
    this.setState({ toDos }, this.updateLocalStorage)
  }

  addToDoItem(toDoIndex) {
    var toDos = this.state.toDos
    toDos[toDoIndex].items.push({
      value: "",
      isDone: false
    })

    this.setState({ toDos }, this.updateLocalStorage)
  }

  editToDoItem(toDoIndex, itemIndex, value) {
    var toDos = this.state.toDos
    toDos[toDoIndex].items[itemIndex].value = value
    this.setState({ toDos }, this.updateLocalStorage)
  }

  toggleItemDone(toDoIndex, itemIndex) {
    var toDos = this.state.toDos
    toDos[toDoIndex].items[itemIndex].isDone = !toDos[toDoIndex].items[itemIndex].isDone
    this.setState({ toDos }, this.updateLocalStorage)
  }

  removeToDoItem(toDoIndex, itemIndex) {
    var toDos = this.state.toDos
    toDos[toDoIndex].items.splice(itemIndex, 1)

    this.setState({ toDos }, this.updateLocalStorage)
  }

  render() {
    const toDos = this.state.toDos.map((toDo, index) =>
      <ToDo
        title={toDo.title}
        items={toDo.items}
        key={index}
        onEditItem={(itemIndex, value) => this.editToDoItem(index, itemIndex, value)}
        onToggleItemDone={(itemIndex, value) => this.toggleItemDone(index, itemIndex)}
        onRemoveItem={(itemIndex) => this.removeToDoItem(index, itemIndex)}
        onEditTitle={(title) => this.editTitle(index, title)}
        onAddItem={(item) => this.addToDoItem(index, item)}
        onRemove={() => this.removeToDo(index)}
      />
    )

    return (
      <div className="App">
        <button onClick={this.addToDo}>Add ToDo</button>
        <div className="ToDoWrapper">

          {toDos}
        </div>
      </div>
    );
  }
}

export default App;
