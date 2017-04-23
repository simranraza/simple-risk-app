import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Settled from './Settled';
import Unsettled from './Unsettled'
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settledCustomers:[],
      unsettledCustomers:[],
      settledMap:{},
      unSettledMap:{}
    };
  }
  getSettledBets(){

    let settledMap = new Map();
    const SETTLED_BETS_URL = 'http://private-1ab82e-whbetsapi.apiary-mock.com/settled';
    fetch(SETTLED_BETS_URL,{
      method : 'GET'
    })
    .then(response => response.json())
    .then(json => {


      json.forEach((item)=>{

        var bet = {totalBets:1,wonBets:0};

        //if customer does not exists in Map
        if (typeof(settledMap.get(item.customer)) == "undefined"){
          bet.wonBets = item.win > 0 ? 1:0;
          settledMap.set(item.customer,bet);
        }
        else {
          bet = settledMap.get(item.customer);
          bet.wonBets = item.win > 0 ? bet.wonBets+1: bet.wonBets;
          bet.totalBets = bet.totalBets +1;
          settledMap.set(item.customer,bet);
        }

      });
      this.setState(
        {
          settledCustomers: json,
          settledMap:settledMap
        }
      );

    })
  }

  getUnsettledBets(){
    const UNSETTLED_BETS_URL = 'http://private-1ab82e-whbetsapi.apiary-mock.com/unsettled';
    fetch(UNSETTLED_BETS_URL,{
      method : 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState(
        {
          unsettledCustomers: json,

        }
      );
    });
  }
  isUnusualSettled(cust_id){
    let settledMap = this.state.settledMap;
    let bet = settledMap.get(cust_id);
    let per = (100/bet.totalBets)*bet.wonBets;

    return per > 60 ? true:false;
  }

  componentWillMount(){
    this.getSettledBets();
    this.getUnsettledBets();
  }
  render(){

    return(
      <div>
        <div className="App-main"><h2>Simple Risk App</h2></div>
        <div className="App-main">
          <p>Settled Bets</p>
          <Settled settledCustomers={this.state.settledCustomers} settledMap={this.state.settledMap}></Settled>
        </div>
        <div className="App-main">
          <p>Un-Settled Bets</p>
          <Unsettled unsettledCustomers={this.state.unsettledCustomers} settledCustomers={this.state.settledCustomers}></Unsettled>
        </div>
      </div>
    )
  }
};

export default App;
