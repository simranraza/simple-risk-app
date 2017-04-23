import React, {Component} from 'react';
import _ from 'lodash';

class Settled extends Component{
  constructor(props){
    super(props);

  }

  isUnusualSettled(cust_id){
    let settledMap = this.props.settledMap;
    let bet = settledMap.get(cust_id);
    let per = (100/bet.totalBets)*bet.wonBets;

    return per > 60 ? true:false;
  }
  render()
    {
      let settled = _.map(this.props.settledCustomers, (scustomer) =>{
        return(
                          <tr className={(this.isUnusualSettled(scustomer.customer)?'danger-tr':'bg-primary')}>
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
                                {scustomer.win}
                              </td>
                          </tr>
  )
      });
      return(
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
      )
    }

};
export default Settled;
