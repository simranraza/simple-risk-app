import React, {Component} from 'react';
import _ from 'lodash';

class Unsettled extends Component{
  constructor(props){
    super(props);
  }
  render() {
    console.dir('Un settled'+this.props.unsettledCustomers);
    let unsettled = _.map(this.props.unsettledCustomers, (scustomer) =>{
      return(
                        <tr>
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
