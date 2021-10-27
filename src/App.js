import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import Header from './Hospital/Header'
import Home from './Hospital/Home'
import Login from './Hospital/Login'
import Hospital from './Hospital/Hospital'
import Ward from './Hospital/Ward'
import Doctors from './Hospital/Doctors'
import AddDoc from './Hospital/AddDoc'
import Edit from './Hospital/Edit'
import AddDoc1 from './AddDoc1'
import Logout from './Hospital/Logout'
import Error from './Hospital/Error'
import "./App.css"

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  handleEdit = (data) => {
    this.setState({
      data
    })
  }
  render() {
    console.log("babu", this.state.data)
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            < Route exact path="/" component={Login} />
            <Route path="/Home" component={Home} />
            <Route path="/Doctors" render={() => <Doctors handleEdit={this.handleEdit} />} />
            <Route path="/Ward" component={Ward} />
            <Route path="/Hospital" component={Hospital} />
            {/* <Route path="/AddDoc" component={AddDoc} /> */}
            <Route path="/AddDoc1" component={AddDoc1} />
            {/* <Route path="/AddDoc" render={() => <AddDoc data={this.state.data} />} /> */}
            {/* <Route path="/Edit" component={Edit} /> */}
            {/* <Route path="/Edit/item:id" render={() => <AddDoc1 />} /> */}
            <Route path="/Edit/item:Id" component={AddDoc1} />
            <Route path="/Logout" component={Login} />
            <Route path="/Error" component={Error} />
            <Redirect to="/Error" />
          </Switch>
        </Router>



      </div>
    )
  }
}
