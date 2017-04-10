import React,{Component} from "react";

class Footer extends Component{
    constructor(props){
        super(props);
        this.select = this.select.bind(this);
        this.clear = this.clear.bind(this);
    }
    select(ev){
        this.props.select(ev.target);
    }
    clear(){
        this.props.clear();
    }
    render(){
        return(
            <footer 
                className="footer" 
                style={{display:(this.props.len>0)?"block":"none"}}
            >
                <span className="todo-count">
                    <strong>{this.props.num}</strong>
                    <span>条未选中</span>
                </span>
                <ul className="filters">
                    <li><a 
                            href="#/all" 
                            className={this.props.active=="all"?"selected":""}
                            onClick={this.select}
                        >所有
                        </a></li>
                    <li><a 
                            href="#/active"
                            className={this.props.active=="active"?"selected":""}
                            onClick={this.select}
                        >未完成
                        </a></li>
                    <li><a 
                            href="#/completed"
                            className={this.props.active=="completed"?"selected":""}
                            onClick={this.select}
                        >已完成
                        </a></li>
                </ul>
                <button 
                    className="clear-completed"
                    style={{display:this.props.clearAll}}
                    onClick={this.clear}
                >清除所有
                </button>
            </footer>
        )
    }
}

export default Footer;
