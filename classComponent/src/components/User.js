import { Component } from 'react';

import classes from './User.module.css';

class User extends Component{
  //react에서 화면에 보여주는 용도
  render(){
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
