import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const API = `http://localhost:3000/stocks`;
class MainContainer extends Component {

  state =
  {
    filter: "none",
    sortBy: "none",
    allStocks: [],
    portfolio: []
  }

  //FETCH all stock data, then send to StockContainer
  componentDidMount()
  {
    fetch(API)
    .then(resp => resp.json())
    .then(data => {
      let all = data.map(stock => {
        return ({
          ...stock,
          bought: false
        })
      })
      this.setState({
        allStocks: all
      })
      
    });
  }
  //Handle Like Button
  handlePortfolio = (e) => 
  {
    let found = e.currentTarget.children[0].children[0].innerText;
    let alreadyBought = this.state.allStocks.find(singleStock => {
      return singleStock.name == found;
    })
    //RUNS if not bought yet
    if (alreadyBought.bought == false)
    {
      //Portfolio
      let currentPortfolio = this.state.portfolio;
      currentPortfolio.push(alreadyBought);
      //Change bought to true 
      let all = this.state.allStocks;
      //Copy of allStocks with bought changed to true for the single one
      for (let i=0; i < all.length; i++)
      {
        if (all[i] == alreadyBought)
        {
          alreadyBought.bought = true;
          all[i] = alreadyBought;
        }
      }
      //Change state to match changes
      this.setState({
        allStocks: all, 
        portfolio: currentPortfolio
      });
    }
    else if (alreadyBought.bought == true)
    {
      //Find stock in portfolio and delete
        let currentPortfolio = this.state.portfolio;
        for (let i=0; i < currentPortfolio.length; i++)
        {
          if (currentPortfolio[i] == alreadyBought)
          {
            currentPortfolio.splice(i,1);
          }
        }
      //Change bought to false 
        let all = this.state.allStocks;
        for (let i=0; i < all.length; i++)
        {
          if (all[i] == alreadyBought)
          {
            alreadyBought.bought = false;
            all[i] = alreadyBought;
          }
        }
        //Update state 
        this.setState({
          allStocks: all,
          portfolio: currentPortfolio
        })
    }
    console.log(this.state);
  }

  //setState of sortBy value is the value of radio button 
  handleSearch = (e) => 
  {
    let sortBy = e.target.value;
    this.setState({
      sortBy: sortBy
    })
  }
  //setState for Filter 
  handleFilter = (e) => 
  {
    let selectedFilter = e.target.value;
    this.setState({
      filter: selectedFilter
    })
    console.log(this.state.filter)
  }
  


  render() {
    return (
      <div>
        <SearchBar handleSearch = {this.handleSearch} handleFilter = {this.handleFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer allStocks = {this.state.allStocks} onPortfolio = {this.handlePortfolio} sortBy = {this.state.sortBy} filter = {this.state.filter}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio = {this.state.portfolio} onPortfolio = {this.handlePortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
