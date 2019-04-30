import React from "react";
import Datepicker from "../DatePicker/Datepicker";
import "./index.css";

const modalRoot = document.getElementById("root");

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.currentDate = new Date(props.currentDate);
    this.state = {
      showPicker: false,
      Year: this.currentDate.getFullYear(),
      Month: this.currentDate.getMonth(),
      Day: this.currentDate.getDate(),
      Hour: 7, //this.currentDate.getHours(),
      Minute: 30 //this.currentDate.getMinutes(),
    };
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  _closePortal = e => {
    e.preventDefault();
    this.props.close();
  };

  _saveNotes = e => {
    e.preventDefault();
    const { Year, Month, Day, Hour, Minute } = this.state;
    const time = new Date(Year, Month, Day, Hour, Minute).getTime();
    const value = this._textArea.value;
    if (value === "") {
      this.props.close();
      // let calendar = localStorage.getItem('Calendar_Info');
      // var data = localStorage.getItem(new Date(Year, Month, Day).getTime());
      return;
    }
    if (!window.localStorage) {
      alert("浏览器不支持localstorage");
      return;
    } else {
      let oldData = localStorage.getItem("Calendar_Info");
      // localStorage.getItem(new Date(Year, Month, Day).getTime());
      let newData = null;
      const currentDate = new Date(Year, Month, Day).getTime();
      if (oldData) {
        newData = JSON.parse(oldData);
        if (newData[currentDate]) {
          if (newData[currentDate][time]) {
            newData[currentDate][time].push(value);
          } else {
            newData[currentDate][time] = [];
            newData[currentDate][time].push(value);
          }
        } else {
          newData[currentDate] = {};
          newData[currentDate][time] = [];
          newData[currentDate][time].push(value);
        }
      } else {
        newData = {};
        newData[currentDate] = {};
        newData[currentDate][time] = [];
        newData[currentDate][time].push(value);
      }
      localStorage.setItem("Calendar_Info", JSON.stringify(newData));
      this.props.close();
    }
  };

  _renderCurrentday = e => {
    e.preventDefault();
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

  _openPicker = () => {
    this.setState({
      showPicker: true
    });
  };

  render() {
    const { showPicker, Year, Month, Day, Hour, Minute } = this.state;
    const { position } = this.props;
    let positionStyle = {};
    const residue = position % 7;
    const quotient = position / 7;
    if (residue === 0) {
      positionStyle.left = "-100%";
    }
    if (residue === 1) {
      positionStyle.left = "0";
    }
    if (quotient > 4) {
      positionStyle.top = 0;
      positionStyle.transform = "translateY(-100%)";
    }
    return (
      <React.Fragment>
        <div className="notesBox" style={positionStyle}>
          <div className="notesBox-container">
            <div className="noteBox-date" onClick={this._openPicker}>
              Time&nbsp;{Hour < 10 ? `0${Hour}` : Hour}:
              {Minute < 10 ? `0${Minute}` : Minute}
            </div>
            <div className="noteBox-content">
              <textarea
                ref={ref => {
                  this._textArea = ref;
                }}
                placeholder="Event name"
              />
            </div>
            <div className="noteBox-btn">
            <input
                className="btn"
                type="button"
                value="Close"
                onClick={this._closePortal}
              />
              <input
                className="btn"
                type="button"
                value="Save"
                onClick={this._saveNotes}
              />
            </div>
          </div>
        </div>
        {showPicker && (
          <Datepicker
            renderHour={true}
            renderMinute={true}
            close={this._closePicker}
            submit={this._submitPicker}
            currentDate={new Date(Year, Month, Day, Hour, Minute).getTime()}
          />
        )}
      </React.Fragment>
    );
  }
}
