import { Component } from 'react';
import classes from './Counter.module.css';
import { useSelector, useDispatch, connect} from 'react-redux';
import { counterAction } from '../store';
const Counter = () => {
  //useSelector를 사용하면 자동으로 Subscribe해줌.
  //state => App.js에서 store로 지정한 값을 가져옴.
  const data = useSelector(state => state.counter.counter);
  const isShow = useSelector(state => state.counter.isShow);
  console.log(data);
  console.log(isShow);

  //useDispatch를 사용하여 action값을 줄 수 있음.
  const dispatch = useDispatch();

  const handlerIncrement = () => {
    dispatch(counterAction.increment());
  }

  //payload:값 형태로 전달해줌.
  const handlerIncrese = () => {
    dispatch(counterAction.increase(5))
  }

  const handlerDecrement = () => {
    dispatch(counterAction.decrement());
  }
   
  const toggleCounterHandler = () => {
    dispatch(counterAction.toggle())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {isShow && <div className={classes.value}>{data}</div>}
      
      <div>
        <button onClick={handlerIncrement}>Increment</button>
        <button onClick={handlerIncrese}>Increment 5</button>
        <button onClick={handlerDecrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component{
//   handlerIncrement(){
//     this.props.increment();
//   };
//   handlerDecrement(){
//     this.props.decrement();
//   };
//   toggleCounterHandler(){};
//   //this.함수.bind(this)에서 bind(this)를 해주는 이유
//   //this.함수가 다른 함수를 지목할 수 있기 때문에, 이 클래스에 있는 함수를 지목한다라고 명확하게 알려주기 위함.
//   render(){
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.handlerIncrement.bind(this)}>Increment</button>
//           <button onClick={this.handlerDecrement.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const initState = state =>{
//   return {counter : state.counter};
// }

// const actions = dispatch  => {
//   return{
//     increment : () => dispatch({type:'increment'}),
//     decrement : () => dispatch({type:'decrement'}),
//   }
// }

// export default connect(initState,actions)(Counter);
