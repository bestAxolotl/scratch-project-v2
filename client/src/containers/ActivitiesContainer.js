import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import * as actions from '../store/actions/actions.js'

import SearchBoxComponent from '../components/SearchBox.js'
import ActivitiesComponent from '../components/Activities.js'
import MapContainer from './MapContainer.js'


const mapStateToProps = store => ({
  searchActivities: store.activities.searchedActivities,
  
});

const mapDispatchToProps = dispatch => ({
  
  searchActivity: (e) => {
    dispatch(actions.searchActivity())
  },

  viewActivity: (e) => {
    dispatch(actions.viewActivity())
  }

});



class ActivitiesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMap: true,
      showList: false,
    };
    
    this.searchActivities = this.searchActivities.bind(this)
  } 
  
  searchActivities() {
    actions.searchActivity()
  }
  
  render() {
    return (
      <div>
      <SearchBoxComponent searchActivitiesApiCall={this.searchActivities} />
      <MapContainer />
      <ActivitiesComponent searchActivitiesArray={this.props.searchActivities} />
      </div>
    )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivitiesContainer));