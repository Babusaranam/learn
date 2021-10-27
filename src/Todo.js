import React, { Component } from 'react'
import "./App.css"
export default class Todo extends Component {
    constructor(){
        super();
        this.state={
            checked:false
        }
    }
    handelCheck=()=>{
        this.setState({
            
          if( checked ==="0") {
              return
          } 
        })
    }
    render() {

        return (
            <div className="text-center">

                <input type="text" onChange={(event) => this.props.name(event)} />

                <button type="button" onClick={this.props.name1}>Add</button>
                <button type="button" onClick={this.props.name2}>Delete</button>

                {this.props.name3.map((item, index) => {
                    return (
                        <div>
                            < li >
                                <input type="checkbox" onChange={()=>this.handelCheck()} />
                                <span>
                                    {item}
                                </span>
                            </li>

                        </div>
                    )

                }
                )
                }
                <p>Results:{this.props.name4}</p>


                {/* <div class="form-group ">
                    <label for="inputName" class="col-md-1 control-label">select</label>
                    <div class="col-md-5">
                        <div class="checkbox">
                            <input type="checkbox" name="packersOff" id="packers" value="1" />
                            <label for="packers" class="strikethrough">sssssssss</label>
                        </div>
                    </div>
                </div> */}
            </div >
        )
    }
}
