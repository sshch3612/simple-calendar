import React, { Component } from "react";
import { mGetDate, getFirstDay } from "../../util/util";
import NotesSave from "../NoteSave/NotesSave";
import Notes from "../NoteSave/Notes";
import Datepicker from "../DatePicker/Datepicker";
import EventList from "./EventList";
import HeaderItem from "./HeaderItem";
import editAdd from "./editAdd.svg";
import rightArrow from "./rightArrow.svg";
import leftArrow from "./leftArrow.svg";

import "./index.css";
// const currentDate = new Date();

export default class ContentItem extends Component {
  constructor(props) {
    super(props);
    this.currentDate = new Date();
    this.state = {
      showPortal: false,
      showPicker: false,
      Year: this.currentDate.getFullYear(),
      Month: this.currentDate.getMonth(),
      Day: this.currentDate.getDate(),
      currentDay: this.currentDate.getDate(),
      Hour: this.currentDate.getHours(),
      Minute: this.currentDate.getMinutes(),
      showNotesindex: null,
      showPortalNotes: false
    };
  }

  /**
   *生成日历展示信息
   *
   */
  _renderContent = (year, month) => {
    //获取每月天数 当月  getFirstDay
    //mGetDate
    //year = new Date().getFullYear();
    const {
      showPortalNotes,
      showNotesindex,
      Year,
      Month,
      Day,
      currentDay
    } = this.state;
    const currentDate = new Date(Year, Month, Day).getTime();
    month = month + 1;
    const days = mGetDate(year, month);
    const Predays = mGetDate(year, month - 1);
    const firstDay = getFirstDay(year, month);
    const result = [];
    const preResult = [];
    const nextResult = [];
    for (let j = 0; j < firstDay; j += 1) {
      preResult.unshift(
        <div
          key={`firstDay${j}`}
          className="pre-contentItem"
          onClick={() => {
            this._renderPreContent(Predays - j);
          }}
        >
          {Predays - j}
        </div>
      );
    }
    for (let i = 1; i <= days; i += 1) {
      result.push(
        <div
          key={`days${i}`}
          className={[
            "contentItem",
            Day === i ? "content_hover" : "",
            Month === new Date().getMonth() && currentDay === i
              ? "content_visited"
              : ""
          ].join(" ")}
           //_renderNotes}//showPortalNotes
        >
          <div style={{height:'100%'}}
          onClick={() => {
            this._renderCalendar(i, preResult.length);
          }}
          >{i}</div>
          {/* {Day === i && showPortalNotes && (
            <Notes
              position={showNotesindex}
              close={this._closePortal}
              currentDate={currentDate}
            />
          )} */}
        </div>
      );
    }
    let length = result.length + preResult.length;
    for (let i = length + 1; i <= 42; i += 1) {
      nextResult.push(
        <div
          key={`days${i}`}
          className="next-contentItem"
          onClick={() => {
            this._renderNextContent(i - length);
          }}
        >
          {i - length}
        </div>
      );
    }
    return [...preResult, ...result, ...nextResult];
  };

  _renderPreContent = (index = this.state.Day) => {
    const { Month } = this.state;
    if (Month <= 0) {
      this.setState((preState, props) => ({
        Month: 11,
        Day: index,
        Year: preState.Year - 1,
        showPortalNotes: false
      }));
    } else {
      this.setState((preState, props) => ({
        Month: preState.Month - 1,
        Day: index,
        showPortalNotes: false
      }));
    }
  };

  _renderNextContent = (index = this.state.Day) => {
    const { Month } = this.state;
    if (Month >= 11) {
      this.setState((preState, props) => ({
        Month: 0,
        Day: index,
        Year: preState.Year + 1,
        showPortalNotes: false
      }));
    } else {
      this.setState((preState, props) => ({
        Month: preState.Month + 1,
        Day: index,
        showPortalNotes: false
      }));
    }
  };

  _closePortal = e => {
    this.setState({
      showPortal: false,
      showPortalNotes: false
    });
  };

  _renderCalendar = (index, preLenght) => {
    const currenNum = index + preLenght;
    this.setState({
      Day: index,
      showPortalNotes: true,
      showNotesindex: currenNum
    });
  };

  _renderNotes = e => {
    e.preventDefault();
    this.setState({
      showPortal: true
    });
  };

  /**
   * 跳到指定日期
   * */
  _openPicker = e => {
    e.preventDefault();
    this.setState({
      showPicker: true
    });
  };

  _closePicker = () => {
    this.setState({
      showPicker: false
    });
  };

  _submitPicker = ({
    yearActive,
    monthActive,
    dayActive,
    hourActive,
    minuteActive
  }) => {
    this.setState({
      Year: yearActive,
      Month: monthActive,
      Day: dayActive,
      Hour: hourActive,
      Minute: minuteActive
    });
  };

  render() {
    const {
      Year,
      Month,
      Day,
      Hour,
      Minute,
      showPortal,
      showPicker
    } = this.state;
    const currentDate = new Date(Year, Month, Day).getTime();
    return (
      <React.Fragment>
        <div className="header">
          <div
            className="preMonth"
            onClick={() => {
              this._renderPreContent();
            }}
          >
            <img
              style={{ height: "100%", width: "100%" }}
              src={leftArrow}
              alt="上个月"
            />
          </div>
          <div className="currentMonth" onClick={this._openPicker}>
            {Year}年{Month + 1 < 10 ? `0${Month + 1}` : Month + 1}月
            {Day < 10 ? `0${Day}` : Day}日
          </div>
          <div
            className="nextMonth"
            onClick={() => {
              this._renderNextContent();
            }}
          >
            <img
              style={{ height: "100%", width: "100%" }}
              src={rightArrow}
              alt="下个月"
            />
          </div>
          <div className="editAdd" onClick={this._renderNotes}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={editAdd}
              alt="添加"
            />
          </div>
        </div>
        <HeaderItem />
        <div
          className="content"
          ref={el => {
            this.contentPosition = el;
          }}
        >
          {this._renderContent(Year, Month)}
        </div>
        <EventList currentDate={currentDate} />
        {showPortal && (
          <NotesSave close={this._closePortal} currentDate={currentDate} />
        )}
        {showPicker && (
          <Datepicker
            renderYear={true}
            renderMonth={true}
            renderDay={true}
            close={this._closePicker}
            submit={this._submitPicker}
            currentDate={new Date(Year, Month, Day, Hour, Minute).getTime()}
          />
        )}
      </React.Fragment>
    );
  }
}
