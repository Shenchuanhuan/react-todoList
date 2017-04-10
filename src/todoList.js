import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from './comm/Header.js';
import * as list  from "./comm/Main.js";
import Footer from "./comm/Footer.js";
require('./css/index.css');
require('./css/base.css');

let Li = list.Main;
/*页面F5刷新保持同步*/
let arrInit = null;
if(!localStorage.getItem("arr")){
    arrInit = [];
}else{
    arrInit = JSON.parse(localStorage.getItem("arr"));
}
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            arr:arrInit,
            val: '',
            show:"all"
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.toggle = this.toggle.bind(this);
        this.del = this.del.bind(this);
        this.allCheck = this.allCheck.bind(this);
        this.select = this.select.bind(this);
        this.clear = this.clear.bind(this);
        this.mainKeyDown = this.mainKeyDown.bind(this);
    }
    onChange(ev){
        this.setState({
           val:ev.target.value
        })
    }
    onKeyDown(ev){
        if(ev.keyCode != 13||!ev.target.value)return;
        let {arr:newArr} = this.state;
        let val = ev.target.value.trim();
        let data = {
            id:new Date().getTime(),
            val:val,
            check:false
        };
        newArr.push(data);
        let arrJson;
        arrJson = JSON.stringify(newArr);
        localStorage.setItem('arr',arrJson);
        this.setState({
            arr:newArr,
            val:''
        })  
    }
    toggle(todo){
        let id = todo.id;
        let {arr} = this.state;
        let newArr = null;
        newArr = arr.map((e,i)=>{
            if(e.id == id){
                e.check = !e.check;
            }
            return e;
        })
         let arrJson;
        arrJson = JSON.stringify(newArr);
        localStorage.setItem('arr',arrJson);
        this.setState({
            arr:newArr,
        })
    }
    del(todo){
        let {arr} = this.state;
        let restArr = null;
        restArr = arr.filter((e,i)=>{
            return e.id !== todo.id;
        });
        let arrJson;
        arrJson = JSON.stringify(restArr);
        localStorage.setItem('arr',arrJson);
        this.setState({
            arr:restArr
        })
    }
    allCheck(ev){
        let {checked} = ev.target;
        let {arr} = this.state;
        let list = null;
        list = arr.map((e,i)=>{
            e.check = checked;
            return e;
        });
        let arrJson;
        arrJson = JSON.stringify(list);
        localStorage.setItem('arr',arrJson);
        this.setState({
            arr:list
        })
    }
    select(ele){
        let active;
        switch(ele.innerHTML){
            case "所有":
                active = "all";
                break;
            case "未完成":
                active = "active";
                break;
            case "已完成":
                active = "completed";
                break;
        }
        this.setState({
            show:active
        })
    }
    clear(){
        let {arr} = this.state;
        let clearArr = null;
        clearArr = arr.filter((e,i)=>{
            return !e.check;
        })
        let arrJson;
        arrJson = JSON.stringify(clearArr);
        localStorage.setItem('arr',arrJson);
        this.setState({
            arr:clearArr
        })
    }
    mainKeyDown(id,mainVal){
        let {arr} = this.state;
        arr = arr.map((e,i)=>{
            if(e.id === id){
                e.val = mainVal
            }
            return e;
        })
        let arrJson;
        arrJson = JSON.stringify(arr);
        localStorage.setItem('arr',arrJson);
        this.setState({
            arr:arr
        })
    }
    render(){
        //头部数据传递
        let headData = {
            change:this.onChange,
            enter:this.onKeyDown,
            val:this.state.val
        }
        //main
        let {arr} = this.state;
        let liData = null;
         //计数
        let num = this.state.arr.length;
        if(arr.length){ 
            liData = arr.map((e,i)=>{
                if(e.check)num--;
                 let data = {
                    key:e.id,
                    cont:e.val,
                    check:e.check,
                    todo:e,
                    toggle:this.toggle,
                    del:this.del,
                    mainKeyDown:this.mainKeyDown
                 }
                //初始默认显示：所有 
                if(this.state.show == "all"){
                    return <Li {...data}/>
                }
                if(this.state.show == "active"){
                    if(!e.check){
                        return <Li {...data}/>
                    }
                }
                if(this.state.show == "completed"){
                    if(e.check){
                        return <Li {...data}/>
                    }
                }   
            });
        }
        //footer部分
        let len = arr.length;
        let clearAll;
        num === arr.length?clearAll="none":"block";
        let footData = {
            num:num,
            len:len,
            active:this.state.show,
            select:this.select,
            clearAll:clearAll,
            clear:this.clear
        }
        return(
            <div>
                <Header {...headData}/>
                <section className="main">
                    <input 
                        type="checkbox"
                        style={{display:(this.state.arr.length>0)?"block":"none"}}
                        className="toggle-all"
                        onChange={this.allCheck}
                        checked={(num==0)&&(arr.length)}
                    >
                    </input>
                    <ul className="todo-list">
                      {liData}
                    </ul>
                </section>
                <Footer {...footData}/> 
            </div>
        )                                  
    }
}
ReactDOM.render(
  <App />,
  document.getElementById('box')
)

