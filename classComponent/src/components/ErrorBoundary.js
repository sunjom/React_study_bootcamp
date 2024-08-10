import { Component } from "react";

class ErrorBoundary extends Component{
    constructor(){
        super();
        this.state = {hasError:false}
    }

    //클래스 컴포넌트를 오류 경계로 만듦.
    //클래스 컴포넌트 + 생명 주기 메소드를 갖는 컴포넌트이여야 함.
    componentDidCatch(error){
        console.log(error);
        this.setState({hasError:true})
    }

    render(){
        if(this.state.hasError){
            return <p>Something was wrong</p>
        }
        return this.props.children
    }
}

export default ErrorBoundary;