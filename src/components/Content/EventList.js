import React, { Component } from "react";
import { GetCurrentDate } from "../../util/util";
import { withRouter } from 'react-router-dom';
import "./index.css";

class EventList extends Component {
  _renderTime = time => {
    const { Year, Month, Day, Hour, Minute } = GetCurrentDate(
      new Date(parseInt(time, 10))
    );
    return `${Year}/${Month}/${Day}  ${Hour}:${Minute}`;
  };

  _renderItem = () => {
    const allEvent = localStorage.getItem("Calendar_Info"); //this.props.currentDate

    // console.log(allEvent,222,this.props.currentDate, this.props);
    if (!allEvent) {
      return;
    }
    const data = JSON.parse(allEvent);
    const currentData = data[this.props.currentDate];
    const result = [];
    if (currentData) {
      Object.keys(currentData)
        .sort()
        .map((item, i) => {
           return currentData[item].map( (child,j)=>{
              return result.push(
                <li key={`${i}${j}`}><div  className="eventItem" onClick={ ()=> {
                  console.log('编辑功能')
                }}>
                  <div className="eventtitle">{this._renderTime(item)}</div>
                  <div className="eventcontent">{child}</div>
                </div></li>
              )
           })
        });
      return result;
    } else {
      return (
        <div className="eventItem_nodata">
          <span>没有日程</span>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="eventList">
        <div className="eventList-header">
          <div className="today">今日历程</div>
          <div className="alldays" onClick={()=>{
            this.props.history.push('/record')
          }}>全部日程</div>
        </div>
        <ul className='eventList-content'>
        {this._renderItem()}
        </ul>
      </div>
    );
  }
}

export default withRouter(EventList);
