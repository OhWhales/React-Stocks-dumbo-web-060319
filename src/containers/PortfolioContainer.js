import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  makePortfolioStocks = () => {
    let all = this.props.portfolio.map(stock => {
      return(<Stock onPortfolio = {this.props.onPortfolio} name = {stock.name} price = {stock.price}/>)
    })

    return all;
  }

  render() {
    
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            //render your portfolio stocks here
            <div> {this.makePortfolioStocks()} </div>
          }
      </div>
    );
  }

}

export default PortfolioContainer;
