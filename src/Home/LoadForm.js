import { API } from 'aws-amplify'
import React, { Component, } from 'react';

class LoadForm extends Component {
    constructor(props) {
        super(props);
        console.log(props)

        // var loadForm = {}
        // props.data.map( (item)=>{
        //     loadForm[item.uid] = "0"
        // })

        // const loadForm = Object.fromEntries(props.data.map( (item) => [item.uid, "0"] ));

        // this.state = { 
        //     loadForm: loadForm
        // };
    }

    async loadProduct() {
        const filterList = Object.entries(this.props.loadForm).filter(([key, value])=> parseInt(value) >= 1)
        if (filterList.length === 0) return Promise.resolve(false)
        const filterDict = Object.fromEntries(filterList);

        const myInit = {
          body: filterDict
        }
        return API.post("home", "test/loadProduct", myInit).then(data => {
          console.log(data)
        }
        ).catch(error => console.log('error fetching data..', error));
      }
    
    loadProductClick = (event) => {
        console.log(event)
        const form = event.target.form
        if (form.checkValidity() === true) {
            event.preventDefault();
            this.loadProduct().then( data => {
                if(data !== false) this.props.refresh();
            })
          }
    }

    onChange = (key, val) => {
        this.props.setLoadForm(key, val)
    }

    render(){
        console.log("loadForm re-render")
        return (
            <>
                <h5>ProductList</h5>
                <form action="/" method="post">
                    <table className="table accordion accordion-flush">
                        <thead>
                            <tr>
                                <th scope="col">Name (UID)</th>
                                <th scope="col" className="w-25">Cost</th>
                                <th scope="col" className="w-25">Load</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.props.data.map((item) => {
                                    
                                    return(
                                        <>
                                            <tr>
                                                <th scope="row"> 
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#p"+item.uid} aria-expanded="false">
                                                    {item.name} {item.uid}
                                                    </button>
                                                </th>
                                                <td> {item.cost}</td>
                                                <td> 
                                                    <div className="form-outline">
                                                    <input name={item.uid} type="number" className="form-control" placeholder="0" min="0" value={this.props.loadForm[item.uid]} onChange={(e)=>this.onChange(e.target.name, e.target.value)} />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="collapse accordion-collapse" id={"p"+item.uid} >
                                                <td colSpan="3">{item.description}</td>
                                            </tr>
                                        </>
                                    )
                                })}
                                
                        </tbody>
                    </table>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary" onClick={this.loadProductClick}>Load</button>
                    </div>
                </form>
            </>
        );
    }
}

  export default LoadForm;