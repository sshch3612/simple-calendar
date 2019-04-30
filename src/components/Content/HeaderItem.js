import React, { Component } from 'react';
import './index.css';

export default  class HeaderItem extends Component {
  week = ['日','一','二','三','四','五','六']
  render() {
    return (
      <div className='weekheader'>
        {this.week.map((item, 
          index ) => <div key={index} className='weekheaderItem'>{item}</div>)}
      </div>
    );
  }
}

