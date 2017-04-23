import React, {Component} from 'react';
import _ from 'lodash';

class Unsettled extends Component{
  constructor(props){
    super(props);
  }

  highlistRisk(bet)
  {
    let rval="";
    console.dir('bet:'+ bet);

    if (bet.stake > (this.getCustomerAvgBet(bet.customer)*10)) {
      console.log('30 time higher'+ bet.customer);
      if (bet.stake > (this.getCustomerAvgBet(bet.customer)*30))
        rval = "unusual-high-stake";
      else
        rval = "unusual-tentimes-stake";
    }
    else if (bet.toWin > 1000){
      rval = "unusual-high-won";
    }
    else
      rval = "normal";
    return rval;
  }
  getCustomerAvgBet(cust_id){
    let cust_history = this.props.settledCustomers;
    var totalBets=0;
    var totalStake=0
    var avg = 0;
    cust_history.forEach((item)=>{
        if(item.customer === cust_id){
          totalBets = totalBets+1;
          totalStake = totalStake + item.stake;
        }
      });
      avg = totalStake/totalBets;

      return avg;
  }
  render() {
    console.dir('Un settled'+this.props.unsettledCustomers);
    let unsettled = _.map(this.props.unsettledCustomers, (scustomer) =>{
      return(
                        <tr className = {(this.highlistRisk(scustomer))}>
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
                              {scustomer.toWin}
                            </td>
                        </tr>
)
    });
    return (
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
                    To Win
                  </th>
              </tr>
          </thead>
          <tbody>
              {unsettled}
           </tbody>
        </table>
      </div>
    );
  }
};
export default Unsettled;
