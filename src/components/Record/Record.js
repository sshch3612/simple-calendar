import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { GetCurrentDate } from "../../util/util";
import "./index.css";

class Record extends Component {
  _renderTime = time => {
    const { Year, Month, Day, Hour, Minute } = GetCurrentDate(
      new Date(parseInt(time, 10))
    );
    return `${Year}/${Month}/${Day}  ${Hour}:${Minute}`;
  };

  _renderItem = () => {
    const allEvent = localStorage.getItem("Calendar_Info"); //this.props.currentDate

    if (!allEvent) {
      return;
    }
    let currentData = JSON.parse(allEvent);
    const result = [];
    if (currentData) {
      Object.keys(currentData)
        .sort()
        .map((item, i) => {
          return Object.keys(currentData[item])
            .sort()
            .map((childitem, j) => {
              return currentData[item][childitem].map((item, k) => {
                return result.push(
                  <li key={`${i}${j}${k}`}>
                    <div className="eventItem">
                      <div className="eventtitle">
                        {this._renderTime(childitem)}
                      </div>
                      <div className="eventcontent">{item}</div>
                    </div>
                  </li>
                );
              });
            });
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
      <div className="RecordList">
        <div className="RecordList-header">
          <div
            className="today"
            onClick={() => {
              this.props.history.go(-1);
            }}
          >
            关闭
          </div>
          <div className="alldays">日程表</div>
        </div>
        <ul className="RecordList-content">{this._renderItem()}</ul>
      </div>
    );
  }
}

export default withRouter(Record);
