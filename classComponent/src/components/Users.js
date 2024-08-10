import { Component, useState } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component{
  constructor(){
    super();
    //클래스 컴포넌트는 상태를 객체로만 받을 수 있음.
    this.state={
      showUsers:true
    }
  }

  componentDidUpdate(){
    if(this.props.users.length === 0){
      throw new Error('No users provided!')
    }
  }

  toggleUsersHandler(){
    //curState => 값을 전달받은 this.state
    //클래스 컴포넌트는 상태를 overriding하지 않고, 특정 값만 바꿀 수 있음
    //useState에선 overriding을 하기 때문에 바뀌지 않는 값도 써줘야 함.
    this.setState((curState) => {
      return {showUsers : !curState.showUsers}
    });
  };
  
  
  render(){
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    //함수를 부를때도 this사용 + 내부에서 실행된 내용과 일치시키기 위한 bind 
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}


// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
