import { configureStore, createSlice } from '@reduxjs/toolkit'
import redux, { createStore } from 'redux'


const initialCountrrState = {counter:0, isShow:true}

// name, initialState, reducers가 필요함.
//initialState은 초기에 이름이 같은 변수를 선언해 초기화해주면 자동으로 할당해줌
//immer라는 패키지를 통해 자동으로 새로운 값을 만들어 반환해줌 
const counterSlice = createSlice({
    name:'counter',
    initialState:initialCountrrState,
    reducers:{
        increment: (state) => {
            state.counter++;
        },
        decrement: (state) => {
            state.counter--;
        },
        increase: (state,action) => {
            state.counter += action.payload;
        },
        toggle: (state) => {
            state.isShow = !state.isShow;
        }
    }
})

const initialAuthState = {isAuthenticated:false}

const authSlice = createSlice({
    name:'auth',
    initialState: initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        }
    }
});

// const counterReducer = (state=initVal, action) => {
//     if(action.type === "increment"){
//         //사용하지도 않는 isShow를 업데이트해주는 이유
//         // => 업데이트를 안해주면 자동으로 isShow는 undefined가 되기 때문에 false밖에 안나옴.
//         //reducer는 기존값을 업데이트해주는 것이 아닌, 새로운 값을 반환해 줘야 됨.
//         return(
//             {
//                 counter : state.counter +1,
//                 isShow : state.isShow,
//             }
//         )
//     }
//     if(action.type ==='increse'){
//         return {
//             counter: state.counter + action.amount,
//             isShow : state.isShow,
//         }
//     }

//     if(action.type === 'decrement'){
//         return(
//             {
//                 counter : state.counter -1,
//                 isShow : state.isShow,
//             }
//         )
//     }

//     if(action.type === 'toggle'){
//         return(
//             {
//                 counter: state.counter,
//                 isShow : !state.isShow,
//             }
//         )
//     }

//     return state;
// }

//store에는 기본적으로 reducer가 들어감.
//const store = createStore(counterReducer);

//configureStore은 여러 개의 Slice를 저장 할 수 있음(key값을 이용해)
const store = configureStore({
    reducer:{counter: counterSlice.reducer, auth:authSlice.reducer},
});

export const counterAction =  counterSlice.actions
export const authActions = authSlice.actions
export default store;