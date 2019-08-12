import React, { Component } from 'react';
import Stock from '../components/Stock'
import { SSL_OP_NO_TICKET } from 'constants';

class StockContainer extends Component {

  renderStocks = () => 
  {
    //FILTERS
    let preFilter = this.props.allStocks;
    let afterFilter = preFilter;
    if (this.props.filter == "Finance")
    {
      afterFilter = afterFilter.filter((stock) => {
        return stock.type == "Finance"
      })
    }
    else if (this.props.filter == "Sportswear")
    {
      afterFilter = afterFilter.filter((stock) => {
        return stock.type == "Sportswear"
      })
    }
   
    //MAP THRU FILTER
    let allStocks = afterFilter.map(stock => 
      {
        
        return (
          <Stock onPortfolio = {this.props.onPortfolio} name = {stock.name} price = {stock.price} />
        )
      });

    //SORTS
    if(this.props.sortBy == "Alphabetically")
    {
      allStocks = allStocks.sort(function(a,b)
      {
        if (a.props.name < b.props.name)
        {
          return -1;
        }
        if (a.props.name > b.props.name)
        {
          return 1;
        }
        return 0;
      })
    }
    else if (this.props.sortBy == "Price")
    {
      allStocks = allStocks.sort(function(a,b)
      {
        if (a.props.price < b.props.price)
        {
          return -1;
        }
        if (a.props.price > b.props.price)
        {
          return 1;
        }
        return 0;
      })
    }
    return allStocks
  }

  render() {
    console.log(this.props.filter)
    return (
      <div>
        <h2>Stocks</h2>
        {
          <div> {this.renderStocks()} </div>
          //render the list of stocks here

        }
      </div>
    );
  }

}

export default StockContainer;
