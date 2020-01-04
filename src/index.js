import React, { PureComponent } from "react";
import styles from "./index.less";

export default class TabHeader extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultHead } = this.props;

    this.state = {
      //containerWidth: 1500,
      checkedPosition: 0,
      barWidth: 70,
      checkedHead: defaultHead,
    };
    this.container = {};
  }

  componentDidMount() {
    const { heardList } = this.props;
    let headerWidth = 0;

    (heardList || []).forEach((item, index) => {
      headerWidth += this[`ref_${index}`].getBoundingClientRect().width;
    });
    const containerWidth = this.container.getBoundingClientRect().width;
    let restWidth = 0;

    if (containerWidth > headerWidth) {
      restWidth = (containerWidth - headerWidth) / heardList.length;
    }

    (heardList || []).forEach((item, index) => {
      this[`ref_${index}`].style.width = `${this[`ref_${index}`].getBoundingClientRect().width +
        restWidth}px`;
    });

    this.ref_0 && this.setState({ barWidth: this.ref_0.getBoundingClientRect().width });
  }

  onClickHeader = (checkedHead, index) => {
    const { onClickHeader } = this.props;
    let preWidth = 0;
    for (let i = 0; i < index; i += 1) {
      preWidth += this[`ref_${i}`].offsetWidth;
    }
    const barWidth = this[`ref_${index}`].offsetWidth;
    this.setState({ checkedHead, checkedPosition: preWidth, barWidth });
    onClickHeader(checkedHead);
  };

  render() {
    const { checkedHead, checkedPosition, barWidth } = this.state;
    const { heardList, source, height } = this.props;
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : "100%" }}
        ref={r => {
          this.container = r;
        }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            {heardList.map((item, index) => (
              <div
                ref={r => {
                  this[`ref_${index}`] = r;
                }}
                key={item.code}
                className={checkedHead === item.code ? styles.headItemChecked : styles.headItem}
                onClick={this.onClickHeader.bind(this, item.code, index)}
              >
                {item.text} {item.num === "" || item.num.toString() === "0" ? "" : item.num}
              </div>
            ))}
          </div>
          <div
            className={styles.tab_bar}
            style={{
              transform: `translate3d(${checkedPosition}px, 0px, 0px)`,
              width: `${barWidth}px`,
            }}
          />
        </div>
      </div>
    );
  }
}
