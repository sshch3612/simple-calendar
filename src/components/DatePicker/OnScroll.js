import React, { PureComponent } from "react";
import './index.css'

export default class OnScrol extends PureComponent {
  static defaultProps = {
    isLoop: false,//判断是否循环滚动
    start: 0,
    end: 24,
    interval: 1,//循环滚动间隔，默认1 不循环
    deviate: 0,//偏离度
    // itemHeight: 40,//每个Item高度
  };

  constructor(props ){
    super(props);
    this.state = {
      itemActive: props.childActive
    }
  }
  componentDidMount() {
    const scrollHeight = this.ele.scrollHeight;
    this.ele.scrollTop = scrollHeight / 2;
  }

  /**
   *itemActive 点击之后渲染背景色
   *
   * @memberof OnScrol
   */
  _renderMonth = () => {
    const { start, end, interval, deviate,unit
    } = this.props;
    const {itemActive } = this.state;
    const result = [];
    for (let i = start,itemResult = null; i < end; i += 1) {
      if (interval === 1) {
        itemResult = i;
      } else {
        itemResult = i % interval;
        itemResult = itemResult < 0 ? itemResult + interval : itemResult ;
      }
      result.push(
        <li
          key={`item${i}`}
          role="button"
          className={[
            "scrollItem",
            itemActive === i ? "ItemActive" : null
          ].join(" ")}
          onClick={() => {
              this._renderActive(i , itemResult + deviate);
          }}
        >
          {itemResult + deviate < 10 ? `0${itemResult + deviate }` : `${itemResult + deviate}`}{unit}
        </li>
      );
    }
    return result;
  };

  _renderActive = (index , result ) => {
    this.setState({
      itemActive: index,
    })
    this.props.renderActive(result);
  }

  _onScroll = e => {
    e.preventDefault();
    const { isLoop, loadMore, pullDown } = this.props;
    if (!isLoop) return;
    const scrollTop = this.ele.scrollTop;
    const clientHeight = this.ele.clientHeight;
    const scrollHeight = this.ele.scrollHeight;
    if (scrollTop < 10) {
      pullDown();
    }
    if (scrollTop === 0) {
      //
      this.ele.scrollTop = 1;
    }
    if (scrollTop + clientHeight > scrollHeight - 10) {
      loadMore();
    }
    if (scrollTop + clientHeight === scrollHeight) {
      this.ele.scrollTop = scrollHeight - clientHeight - 1;
    }
  };

  render() {
    return (
      <ul
        className='scroll-container'
        ref={el => {
          this.ele = el;
        }}
        onScrollCapture={this._onScroll}
      >
        {this._renderMonth()}
      </ul>
    );
  }
}
