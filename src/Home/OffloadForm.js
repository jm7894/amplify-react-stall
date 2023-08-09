import { API } from 'aws-amplify'
import React, { Component, } from 'react';

class OffloadForm extends Component {
    constructor(props) {
        super(props);
    }

    async offloadProduct() {
        const filterList = Object.entries(this.props.offloadForm).filter(([key, value])=> parseInt(value) >= 1)
        if (filterList.length === 0) return Promise.resolve(false)
        const filterDict = Object.fromEntries(filterList);

        const myInit = {
          body: filterDict
        }
        return API.post("home", "test/offloadProduct", myInit).then(data => {
          console.log(data)
        }
        ).catch(error => console.log('error fetching data..', error));
      }

    offloadProductClick = (event) => {
        const form = event.target.form
        if (form.checkValidity() === true) {
            event.preventDefault();
            this.offloadProduct().then( data => {
                if(data !== false) {
                    this.props.refresh()
                }
            })
          }
    }

    onChange = (key, val) => {
        this.props.setOffloadForm(key, val)
    }

    render() {
        console.log("offloadForm re-render")
        return(
            <div>
                <h5>Inventory</h5>
                <form action="/" method="post">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name (UID)</th>
                                <th scope="col" class="w-25">Quantity</th>
                                <th scope="col" class="w-25">Offload</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.inventoryList.map((inventory)=>{
                                return(<tr>
                                    <th scope="row"> 
                                        {inventory.product.name } ({inventory.product.uid })
                                    </th>
                                    <td> { inventory.quantity } </td>
                                    <td> 
                                        <div class="form-outline">
                                            <input 
                                                name={inventory.product.uid} 
                                                type="number" class="form-control" placeholder="0" min="0" 
                                                max={inventory.quantity} 
                                                value={this.props.offloadForm[inventory.product.uid]} 
                                                onChange={(e)=>this.onChange(e.target.name, e.target.value)}
                                            />
                                        </div>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary" onClick={this.offloadProductClick}>Offload</button>
                    </div>
                </form>
            </div>
        )
    }

}


// function OffloadForm({inventoryList}) {
//     return (
//         <div>
//             <h5>Inventory</h5>
//             <form action="/" method="post">
//                 <table class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">Name (UID)</th>
//                             <th scope="col" class="w-25">Quantity</th>
//                             <th scope="col" class="w-25">Offload</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {inventoryList.map(function(inventory){
//                             return(<tr>
//                                 <th scope="row"> 
//                                     {inventory.product.name } ({inventory.product.uid })
//                                 </th>
//                                 <td> { inventory.quantity } </td>
//                                 <td> 
//                                     <div class="form-outline">
//                                         <input name={inventory.product.uid} type="number" id="typeNumber" class="form-control" placeholder="0"  min="0" max={inventory.quantity} value="0" />
//                                     </div>
//                                 </td>
//                             </tr>)
//                         })}
//                     </tbody>
//                 </table>
//                 <div class="col-auto">
//                     <button type="submit" class="btn btn-primary">Offload</button>
//                 </div>
//             </form>
//         </div>
//         );
//   }
  
  export default OffloadForm;