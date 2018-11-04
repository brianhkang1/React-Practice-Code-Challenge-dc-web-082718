import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(){
    super()
    this.state = {
      sushiList: [],
      sushiPageCounter: 1,
      eatenSushi: [],
      money: 100
    }
  }

  componentDidMount = () => {
    fetch(API.concat(`?_page=${this.state.sushiPageCounter}&_limit=4`))
      .then(res => res.json())
      .then(sushis => {
        this.setState({
          sushiList: sushis
        })
      })
  }

  handleMoreSushi = () => {
    this.setState({
      sushiPageCounter: this.state.sushiPageCounter+1
    }, this.fetchNewSushi)
  }

  fetchNewSushi = () => {
    fetch(API.concat(`?_page=${this.state.sushiPageCounter}&_limit=4`))
    .then(res => res.json())
    .then(sushis => {
      this.setState({
        sushiList: sushis
      })
    })
  }

  handleSushiClick = (sushi) => {
    if(!this.state.eatenSushi.includes(sushi) && (this.state.money - sushi.price) >= 0){
      this.setState({
        eatenSushi: [...this.state.eatenSushi, sushi],
        money: this.state.money - sushi.price
      })
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushiList={this.state.sushiList}
          handleSushiClick={this.handleSushiClick}
          eatenSushi={this.state.eatenSushi}
          handleMoreSushi={this.handleMoreSushi}
        />
        <Table
          money={this.state.money}
          eatenSushi={this.state.eatenSushi}
        />
      </div>
    );
  }
}

export default App;
