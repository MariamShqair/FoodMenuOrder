import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    quant: {},
    dishes: [
      { id: 0.6537933286474382, name: "checken burger", price: 22 },
      { id: 0.6537938286474382, name: "frid potato", price: 2 }
    ],
    orders: [],
    totalPrice: 0
  };

  AddDish = e => {
    e.preventDefault();

    let dish = {};
    dish.id = Math.random();
    dish.name = e.target.name.value;
    dish.price = +e.target.price.value;
    let { dishes } = this.state;
    dishes.push(dish);
    this.setState({ dishes });
  };
  AddOrder = dish => {
    let { orders } = this.state;
    let findItem = false;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i]["name"] === dish.name) findItem = true;
    }

    if (!findItem) orders.push({ ...dish, quant: 1 });
    this.setState({ orders });
  };

  addQuantity = (e, order) => {
    e.preventDefault();
    const { orders, dishes } = this.state;

    if (e.target.quant.value !== "")
      for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].name === order.name) {
          orders[orders.indexOf(order)].price =
            dishes[i].price * +e.target.quant.value;
          orders[orders.indexOf(order)].quant = +e.target.quant.value;
        }
      }

    this.setState({ orders });
  };

  render() {
    let { totalPrice, orders } = this.state;
    const or = orders.map(v => v.price);
    totalPrice = or.reduce((sum, cv) => sum + cv, 0);

    return (
      <div className="main">
        <div className="header">
          <ul>
            <li>
              <a>HOME</a>
            </li>
            <li>
              <a>ORDER PAGE</a>
            </li>
            <li>
              <a>LOGIN</a>
            </li>
          </ul>
          <h1>Welcome to chello restaurant</h1>
        </div>
        <div className="addDish">
          <h1>Add Dish</h1>
          <form
            className="form"
            onSubmit={this.AddDish}
          >
            <input name="name" type="text" placeholder="name" />
            <input name="price" type="text" placeholder="price" />

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="orderMenuPrice">
          <div className="Menu">
            <h1>Menu </h1>
            {this.state.dishes.map(dish => (
              <div key={dish.id}>
                <h3>{dish.name}</h3>
                <div className="image">
                <img src={require("./img/burger.jpg")} />

                </div>
                <button onClick={() => this.AddOrder(dish)}>
                  Add to order
                </button>
              </div>
            ))}
          </div>

          <div className="orders">
            <h1>Orders List</h1>
            {this.state.orders.map((order, key) => (
              <div key={key}>
                <h3>{order.name}</h3>
                
                <form onSubmit={e => this.addQuantity(e, order)}>
                  <input name="quant" type="text" placeholder="quantity" />
                  <button type="submit">Submit</button>
                </form>
              </div>
            ))}
          </div>
          <div className="totalPrice">
            <h1>Total Price</h1>
            {this.state.orders.map((order, key) => (
              <div className="order" key={key}>
                <h3>Name : {order.name}</h3>
                <h3>Quantity : {order.quant}</h3>
                <h3>Price : {order.price}</h3>
              </div>
            ))}
            <h3>{totalPrice}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
