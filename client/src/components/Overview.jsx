import React from 'react';
import axios from 'axios';
import BasicDetails from './BasicDetails';
import DividerLine from './WeGotDividerLine';
import WeGotReview from './WeGotReview';
import LongDescription from './LongDescription';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantTitle: 'Title Placeholder',
      restaurantTagline: 'Tagline Placeholder',
      restaurantType: 'Restaurant', // this is hardcoded for now due to a capitalization error in the data.
      restaurantVicinity: 'Vicinity Placeholder',
      restaurantPriceLevel: 'Price Level Placeholder',
      weGotFoodRating: 'Food Rating Placeholder',
      weGotDecorRating: 'Decor Rating Placeholder',
      weGotServiceRating: 'Service Rating Placeholder',
      restaurantDescription: 'Description Placeholder',
    };
  }

  componentDidMount() {
    this.fetchRestaurantInfo();
  }

  fetchRestaurantInfo() {
    let id = window.location.href.split('/')[4];
    if (!id) {
      id = 'ChIJUcXYWWGAhYARmjMY2bJAG2s';
    }
    console.log('the fetch ID is this:', id);

    axios.get(`/api/restaurants/${id}/overview`)
      .then((response) => {
        this.handleRestaurantChange(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  hrefChangeListener() {
    window.onpopstate = function(event) {
      alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
  }

  handleRestaurantChange(restaurantDetails) {
    let priceLevelInDollars = '';
    const priceLevel = restaurantDetails.priceLevel || 1;
    for (let i = 0; i < priceLevel; i += 1) {
      priceLevelInDollars += '$';
    }
    this.setState({
      restaurantTitle: restaurantDetails.name.toUpperCase(),
      restaurantTagline: restaurantDetails.tagline,
      restaurantVicinity: restaurantDetails.vicinity,
      restaurantPriceLevel: priceLevelInDollars,
      weGotFoodRating: restaurantDetails.zagatFood,
      weGotDecorRating: restaurantDetails.zagatDecor,
      weGotServiceRating: restaurantDetails.zagatService,
      restaurantDescription: restaurantDetails.longDescription,
    });
  }

  render() {
    return (
      <div id="overview-wrapper">
        <div id="overview-restaurant-title">{this.state.restaurantTitle}</div>
        <div id="overview-restaurant-tagline">{this.state.restaurantTagline}</div>
        <BasicDetails
          type={this.state.restaurantType}
          vicinity={this.state.restaurantVicinity}
          priceLevel={this.state.restaurantPriceLevel}
        />
        <DividerLine />
        <div className="overview-wegot-review-title">THE WEGOT REVIEW</div>
        <WeGotReview
          food={this.state.weGotFoodRating}
          decor={this.state.weGotDecorRating}
          service={this.state.weGotServiceRating}
        />
        <LongDescription
          description={this.state.restaurantDescription}
        />
      </div>
    );
  }
}


export default Overview;
