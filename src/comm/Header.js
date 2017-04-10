import React,{Component} from "react";

class Header extends Component{    
    render(){
        return(
            <header className="header">
                <h1>todos</h1>
                <input 
                    className="new-todo" 
                    placeholder="请输入内容" 
                    value={this.props.val}
                    onChange={this.props.change}
                    onKeyDown={this.props.enter}
                />
            </header>
        )
    }
}

export default Header;