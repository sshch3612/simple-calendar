import React from 'react';
import ReactDom from 'react-dom';
import Datepicker from '../DatePicker/Datepicker';
import './index.css'
import checkmark from './checkmark.svg'
import cancel from './cancel.svg'
import arrow from './arrow.svg'

const  modalRoot = document.getElementById('root');

export default  class  extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.currentDate = new Date(props.currentDate);
    this.state = {
      showPicker: false,
      Year: this.currentDate.getFullYear(),
      Month: this.currentDate.getMonth(),
      Day: this.currentDate.getDate(),
      Hour: 7,//this.currentDate.getHours(),
      Minute: 30,//this.currentDate.getMinutes(),
    }
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  _closePortal = ( e ) => {
    e.preventDefault();
    this.props.close();
  }

  _saveNotes = ( e) => {
    e.preventDefault();
    const {Year,
      Month,
      Day,
      Hour,
      Minute,} = this.state;
    const time = new Date(Year, Month, Day, Hour, Minute).getTime();
    const value = this._textArea.value;
    if(value === ''){
      this.props.close();
      // let calendar = localStorage.getItem('Calendar_Info');
      // var data = localStorage.getItem(new Date(Year, Month, Day).getTime());
      return ;
    }
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return;
    }else{
      let oldData =  localStorage.getItem('Calendar_Info');
      // localStorage.getItem(new Date(Year, Month, Day).getTime());
      let newData = null;
      const currentDate = new Date(Year, Month, Day).getTime() ;
      if(oldData ){
        newData= JSON.parse(oldData);
        if(newData[currentDate]){
          if(newData[currentDate][time]){
            console.log(newData[currentDate][time],99999999);
            newData[currentDate][time].push(value);
          }else{
            newData[currentDate][time] = []
            newData[currentDate][time].push(value);
          }
        }else{
          newData[currentDate] = {}
          newData[currentDate][time] = [];
          newData[currentDate][time].push(value);
        }
      }else{
        newData = {};
        newData[currentDate] = {};
        newData[currentDate][time] = [];
        newData[currentDate][time].push(value);
      }
      console.log(Year,Month,Day,3333);
      localStorage.setItem('Calendar_Info',
          JSON.stringify(newData)
          );
      this.props.close();
    }
  }

  _renderCurrentday = (e ) => {
    e.preventDefault();

  }

  _closePicker = ( ) => {
    this.setState({
      showPicker: false
    })
  }

  _submitPicker = ({ yearActive, monthActive, dayActive, hourActive, minuteActive }) => {
    this.setState({
      Year: yearActive,
      Month: monthActive,
      Day: dayActive,
      Hour: hourActive,
      Minute: minuteActive,
    })
  }

  _openPicker = () => {
    this.setState({
      showPicker: true, 
    })
  }

  render() {
    const {showPicker,
      Year,
      Month,
      Day,
      Hour,
      Minute,
    } = this.state;
    const result = (
      <React.Fragment>
        <div className="notesform">
          <div className='notesform-header'>
              <div className='close' onClick={this._closePortal}>
                <img style={{ height: "100%", width: "100%" }} src={cancel} alt='关闭'/>
              </div>
              <div className='title'>新建日程</div>
              <div className='submit' onClick={this._saveNotes}>
                <img style={{ height: "100%", width: "100%" }} src={checkmark} alt='提交'/>
              </div>
          </div>
          <div className='notesform-content'>
              <div className='notesform-time' onClick={this._openPicker}>
                  <div className='title'>时间</div>
                  <div className='date'>{Year}/{Month < 10 ? `0${Month + 1}`:Month + 1}/{Day < 10 ? `0${Day}` : Day}&nbsp;&nbsp;{Hour < 10 ? `0${Hour}`:Hour}:{Minute < 10? `0${Minute}`:Minute}</div>
                  <div className='arrow'>
                    <img style={{ height: "100%", width: "100%" }} src={arrow} alt='>'/>
                  </div>
              </div>
              <div className='notesform-item'>
                  <div className='title'>事件</div>
                  <textarea ref={(ref)=>{this._textArea = ref}} className='edit' type='text' placeholder='请输入...'/>
              </div>
          </div>
        </div>
        {showPicker &&  <Datepicker 
                      renderHour={true}
                      renderMinute={true}
                      close={this._closePicker} 
                      submit={this._submitPicker} 
                      currentDate={new Date(Year, Month, Day, Hour, Minute).getTime()}
                      />}
      </React.Fragment>
    )
    return ReactDom.createPortal(result, this.el,
    );
  }
}