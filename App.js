import React from 'react';
import Loading from "./Loading";
import * as Location from "expo-location";

export default class extends React.Component {
  getLocation = async() => {
    const location = await Location.getCurrentPositionAsync();
  }

  componentDidMount() {
    this.getLocation();
  }


  render() {
    return <Loading />
  }
}
