import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settledCustomers:[],
      unsettledCustomers:[],
      settledMap:{}
    };
  }
  getSettledCustomers(){
    console.log('getting settled customers');
    let settledMap = new Map();
    const SETTLED_BETS_URL = 'http://private-1ab82e-whbetsapi.apiary-mock.com/settled';
    fetch(SETTLED_BETS_URL,{
      method : 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log('settled: '+ json);

      json.forEach((item)=>{
        //console.log('item:'+ item);
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
      console.dir(settledMap);
    })
  }

  isUnusualSettled(cust_id){
    let settledMap = this.state.settledMap;
    let bet = settledMap.get(cust_id);
    let per = (100/bet.totalBets)*bet.wonBets;
    console.dir(bet);
    return per;
  }

  analyseCustomer(){
    this.state.settledCustomers.forEach((item)=>{
      console.log('item:'+ item);
    });
  }
  componentWillMount(){
    this.getSettledCustomers();

  }
  render(){

    let settled = _.map(this.state.settledCustomers, (scustomer) =>{
      return(
                        <tr className="danger-tr">
                            <td className="risk-td">
                              {scustomer.customer}
                            </td>
                            <td className="risk-td">
                              {scustomer.event}
                            </td>
                            <td className="risk-td">
                              {scustomer.participant}
                            </td>
                            <td className="risk-td">
                              {scustomer.stake}
                            </td>
                            <td className="risk-td">
                              {scustomer.win}'-'{this.isUnusualSettled(scustomer.customer)}
                            </td>
                        </tr>
)
    });
    return(
      <div>
        <div><h2>Simple Risk App</h2></div>
        <div>
          <p>Settled customers</p>
          <div>
            <table className="table table-bordered risk-table">
                  <thead>
                      <tr>
                          <th className="risk-th">
                            Customer Id
                          </th>
                          <th className="risk-th" >
                            Event Id
                          </th>
                          <th className="risk-th">
                            No of Participants
                          </th>
                          <th className="risk-th">
                            Stake
                          </th>
                          <th className="risk-th">
                            Win
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {settled}
                   </tbody>
               </table>
          </div>
        </div>
      </div>
    )
  }
};

export default App;
