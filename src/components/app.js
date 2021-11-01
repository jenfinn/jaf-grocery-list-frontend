import React from "react";
import TodoItem from "./grocerylist";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      foods: [],
      food: ""
    };
  }

  componentDidMount() {
    fetch("https://jaf-backend-list.herokuapp.com/items")
      .then(response => response.json())
      .then(data => this.setState({ foods: data }));
  }

  renderFoods = () => {
    return this.state.foods.map(food => {
      return (
        <FoodItem
          key={food.id}
          title={food.title}
          done={food.done}
          id={food.id}
          delete={this.deleteFood}
        />
      );
    });
  };

  handleChange = event => {
    this.setState({ food: event.target.value });
  };

  addFood = event => {
    event.preventDefault();
    fetch("https://jaf-backend-list.herokuapp.com/food", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.state.food,
        done: false
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          foods: [...this.state.foods, data],
          food: ""
        })
      );
  };

  deleteFood = id => {
    fetch(`https://jaf-backend-list.herokuapp.com/food/${id}`, {
      method: "DELETE"
    }).then(
      this.setState({
        foods: this.state.foods.filter(food => food.id !== id)
      })
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Grocery List</h1>
        <form onSubmit={this.addFood}>
          <input
            type="text"
            placeholder="Add Food"
            value={this.state.food}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderFoods()}
      </div>
    );
  }
}

export default App;