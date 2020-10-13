import React from 'react'
import './to-do.css'

class ToDo extends React.Component {
  render() {
    return <div className="ToDo">
      <input
        type="text"
        value={this.props.title}
        onChange={event => this.props.onEditTitle(event.target.value)}
      />

      <button onClick={this.props.onRemove}>X</button>

      <div>
        {this.props.items.map(((item, index) =>
          <div key={index}>
            <input
              value={item.value}
              onChange={event => this.props.onEditItem(index, event.target.value)}
            />
            <input
              name="isDone"
              type="checkbox"
              checked={item.isDone}
              onChange={() => this.props.onToggleItemDone(index)}
            />
            <button onClick={() => this.props.onRemoveItem(index)}>X</button>
          </div>

        ))}
      </div>

      <button onClick={this.props.onAddItem}>+</button>
    </div>;
  }
}

export default ToDo