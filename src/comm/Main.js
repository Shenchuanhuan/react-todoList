import React,{Component} from "react";

class Main extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.del = this.del.bind(this);
        this.dbClick = this.dbClick.bind(this);
        this.change = this.change.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.blur = this.blur.bind(this);
        this.state = {
            db:false,
            val:''
        }
    }
    toggle(){
        this.props.toggle(this.props.todo)
    }
    del(){
        this.props.del(this.props.todo);
    }
    dbClick(){
        this.setState({
            db:true
        },()=>{
            this.refs.lb.focus();
        })
    }
    change(ev){
        ev.target.dataset.val = ev.target.value.trim();
        this.setState({
            val:ev.target.value
        })
    }
    keyDown(ev){
        if(ev.keyCode == 13){
            if(ev.target.value){
                this.setState({
                    db:false,
                    val:ev.target.dataset.val
                })
                this.props.mainKeyDown(this.props.todo.id,this.state.val);
            }else{
                this.setState({
                    db:false
                })
            }
        }
    }
    blur(ev){
         if(ev.target.value){
                this.setState({
                    db:false,
                    val:ev.target.dataset.val
                })
                this.props.mainKeyDown(this.props.todo.id,this.state.val);
            }else{
                this.setState({
                    db:false
                })
            }
    }
    render(){
        let inClass;
        if(this.props.check){
            inClass = "completed";
        }
        if(this.state.db){
            inClass += " editing";
        }
        
        return(
            <li className={inClass}>
                <div className="view">
                    <input 
                        type="checkbox" 
                        className="toggle"
                        checked={this.props.check}
                        onChange={this.toggle}
                    >
                    </input>
                    <label
                        onDoubleClick={this.dbClick}
                    >{this.props.cont}</label>
                    <button 
                        className="destroy"
                        onClick={this.del}
                    ></button>
                </div>
                 <input 
                    type="text"
                    className="edit"
                    data-val=""
                    ref="lb"
                    value={this.state.val}
                    onChange={this.change}
                    onKeyDown={this.keyDown}
                    onBlur={this.blur}
                >
                </input>
            </li>
        )
    }
}

export {Main};
