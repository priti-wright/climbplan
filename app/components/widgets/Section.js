import React from 'react';

import styles from './Section.scss';

const Section = React.createClass({
  handleClick: function(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: styles.section
      });
    }else{
      this.setState({
        open: true,
        class: styles.section + ' ' + styles.sectionOpen
      });
    }
  },
  getInitialState: function(){
     return {
       open: false,
       class: styles.section
     }
  },
  render: function() {
    return (
      <div className={this.state.class}>
        <button></button>
        <div className={styles.sectionhead} onClick={this.handleClick}>{this.props.title}</div>
        <div className={styles.articlewrap}>
          <div className={styles.article}>
            {this.state.open ? this.props.children : null}
          </div>
        </div>
      </div>
    );
  }
});

export default Section;
