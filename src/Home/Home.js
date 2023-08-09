import LoadForm from "./LoadForm";
import OffloadForm from "./OffloadForm";
import { Amplify, API, Auth } from 'aws-amplify'
import React, { Component } from 'react';


class Home extends Component {

  constructor(props) {
    super(props);
    const offloadForm = {}
    // 
    const loadForm = {}
    // 
    this.state = { 
      user:null, 
      items: [], 
      inventoryList: [], 
      state: false, 
      offloadForm: offloadForm,
      loadForm: loadForm
    };
    Amplify.configure({
      API: {
          endpoints: [
              {
                name: "home",
                endpoint: "https://j6cqnyxny5.execute-api.ap-southeast-2.amazonaws.com/",
                region: "ap-southeast-2",
                custom_header: async () => {
                  return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
                }
              },
            ]
    }});
  }

  setOffloadForm = (key, val) => {
    let offloadForm = this.state.offloadForm
    offloadForm[key] = val
    this.setState({offloadForm: offloadForm})
  }

  setLoadForm = (key, val) => {
    let loadForm = this.state.loadForm
    loadForm[key] = val
    this.setState({loadForm: loadForm})
  }

  componentDidMount(){
    this.getData();
    Auth.currentAuthenticatedUser().then(user =>{
      this.setState({user:user})
    });
  }

  async getData()  {
    return API.get("home", "test/home").then(data => {
      console.log(data)
      const offloadForm = Object.fromEntries(data.inventoryList.map( (item) => [item.product.uid, "0"] ))
      const loadForm = Object.fromEntries(data.data.map( (item) => [item.uid, "0"] ));
      this.setState({
        data: data.data,
        inventoryList: data.inventoryList,
        offloadForm: offloadForm,
        loadForm: loadForm,
        state: true
      }, function(){console.log(this.state.inventoryList)})
    } 
    ).catch(error => console.log('error fetching data..', error));
  }

  childrenHandler = (refresh) => {
    console.log("handling")
    this.getData()
  }

  render(){
    console.log("Home re-render")
    const { user, data, inventoryList, state, offloadForm, loadForm } = this.state;

    if (!state || !user) return <div></div>
    return(
      <div className="col py-3 overflow-auto">
            <div className="container">
                <div className="row">
                  <h3>Hi {user.username}</h3>
                </div>
                <div className="row">
                    <div className="col">
                        <LoadForm data={data} refresh={this.childrenHandler} loadForm={this.state.loadForm} setLoadForm={this.setLoadForm} />
                    </div>
                    <div className="col">
                        <OffloadForm inventoryList={inventoryList} refresh={this.childrenHandler} offloadForm={this.state.offloadForm} setOffloadForm={this.setOffloadForm}/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

  
export default Home;