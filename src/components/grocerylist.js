import React from "react";

class FoodItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.done
    };
  }

  toggleDone = () => {
    fetch(`https://jaf-backend-list.herokuapp.com/food/${this.props.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.props.title,
        done: !this.state.done
      })
      // @ts-ignore
    }).then(this.setState({ done: !this.state.done }));
  };

  render() {
    return (
      <div className="item-wrapper">
        <button onClick={() => this.props.delete(this.props.id)}>X</button>
        <input
          type="checkbox"
          onChange={this.toggleDone}
          defaultChecked={this.state.done}
        />
        <p className={this.state.done && "done"}>{this.props.title}</p>
      </div>
    );
  }
}

export default FoodItem;