import React from "react";
import OnScroll from "./OnScroll";
import { mGetDate } from "../../util/util";

import "./index.css";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.currentDate = new Date(props.currentDate);
    this.Year = this.currentDate.getFullYear();
    this.Month = this.currentDate.getMonth();
    this.days = mGetDate(this.Year, this.Month + 1);
    this.state = {
      HourStart: 0,
      HourEnd: 24,
      MinuteStart: 0,
      MinuteEnd: 60,
      MonthStart: 0,
      MonthEnd: 12,
      YearStart: this.Year - 5,
      YearEnd: this.Year + 5,
      DayStart: 0,
      DayEnd: this.days,
      hourActive: 7, //new Date().getHours(),
      minuteActive: 30, //new Date().getMinutes(),
      dayActive: this.currentDate.getDate(),
      monthActive: this.Month,
      yearActive: this.Year,
      monthDays: this.days
    };
  }

  _selectPicker = e => {
    const {
      yearActive,
      monthActive,
      dayActive,
      hourActive,
      minuteActive
    } = this.state;
    e.preventDefault();
    this.props.close();
    this.props.submit({
      yearActive,
      monthActive,
      dayActive,
      hourActive,
      minuteActive
    });
  };

  _closePicker = e => {
    e.preventDefault();
    console.log(3333333, this.props);
    this.props.close();
  };

  _renderyearActive = index => {
    console.log(343434, index);
    this.setState({
      yearActive: index
    });
  };

  _rendermonthActive = index => {
    const { yearActive} = this.state;
    this.setState({
      monthActive: index - 1,
      monthDays:mGetDate(yearActive, index)//new Date(_year, _month, 0).getDate()
    });
  };

  _renderdayActive = index => {
    this.setState({
      dayActive: index
    });
  };

  _renderHourActive = index => {
    this.setState({
      hourActive: index
    });
  };

  _renderMinuteActive = index => {
    this.setState({
      minuteActive: index
    });
  };


  render() {
    const {
      renderYear,
      renderMonth,
      renderDay,
      renderHour,
      renderMinute
    } = this.props;
    const {
      hourActive,
      minuteActive,
      yearActive,
      monthActive,
      dayActive,
      HourStart,
      HourEnd,
      MinuteStart,
      MinuteEnd,
      MonthStart,
      MonthEnd,
      YearStart,
      YearEnd,
      DayStart,
      DayEnd,
      monthDays
    } = this.state;
    return (
      <div className="datePicker" >
        <div className="datepicker-container">
          <div className="datepicker-header">
            {yearActive}年
            {monthActive < 10 ? `0${monthActive + 1}` : monthActive + 1}月
            {dayActive < 10 ? `0${dayActive}` : dayActive}日&nbsp;&nbsp;&nbsp;
            {hourActive < 10 ? `0${hourActive}` : hourActive}:
            {minuteActive < 10 ? `0${minuteActive}` : minuteActive}
          </div>
          <div className='datepicker-content'>
            {renderYear && (
              <OnScroll
                isLoop={true}
                start={YearStart}
                end={YearEnd}
                unit={"年"}
                renderActive={this._renderyearActive}
                pullDown={() => {
                  this.setState((preState, props) => ({
                    YearStart: preState.YearStart - 8
                  }));
                }}
                loadMore={() => {
                  this.setState((preState, props) => ({
                    YearEnd: preState.YearEnd + 8
                  }));
                }}
              />
            )}
            {renderMonth && (
              <OnScroll
                isLoop={true}
                start={MonthStart}
                end={MonthEnd}
                interval={12}
                deviate={1}
                unit={"月"}
                renderActive={this._rendermonthActive}
                pullDown={() => {
                  this.setState((preState, props) => ({
                    MonthStart: preState.MonthStart - 8
                  }));
                }}
                loadMore={() => {
                  this.setState((preState, props) => ({
                    MonthEnd: preState.MonthEnd + 8
                  }));
                }}
              />
            )}
            {renderDay && (
              <OnScroll
                isLoop={true}
                start={DayStart}
                end={DayEnd}
                interval={monthDays}
                deviate={1}
                unit={"日"}
                renderActive={this._renderdayActive}
                pullDown={() => {
                  this.setState((preState, props) => ({
                    DayStart: preState.DayStart - 8
                  }));
                }}
                loadMore={() => {
                  this.setState((preState, props) => ({
                    DayEnd: preState.DayEnd + 8
                  }));
                }}
              />
            )}
            {renderHour && (
              <OnScroll
                isLoop={true}
                start={HourStart}
                end={HourEnd}
                interval={24}
                renderActive={this._renderHourActive}
                pullDown={() => {
                  this.setState((preState, props) => ({
                    HourStart: preState.HourStart - 8
                  }));
                }}
                loadMore={() => {
                  this.setState((preState, props) => ({
                    HourEnd: preState.HourEnd + 8
                  }));
                }}
              />
            )}
            {renderMinute && (
              <OnScroll
                isLoop={true}
                start={MinuteStart}
                end={MinuteEnd}
                interval={60}
                renderActive={this._renderMinuteActive}
                pullDown={() => {
                  this.setState((preState, props) => ({
                    MinuteStart: preState.MinuteStart - 8
                  }));
                }}
                loadMore={() => {
                  this.setState((preState, props) => ({
                    MinuteEnd: preState.MinuteEnd + 8
                  }));
                }}
              />
            )}
          </div>
          <div className="datecontrol">
            <div className="control-close" onClick={this._closePicker}>
              取消
            </div>
            <span>|</span>
            <div className="control-submit" onClick={this._selectPicker}>
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}
