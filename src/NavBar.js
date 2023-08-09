import 'bootstrap/dist/css/bootstrap.css';
import { Auth } from 'aws-amplify'
import { Link }  from 'react-router-dom'

function NavBar() {

    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280}}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">CenterSystem</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/" className="nav-link active" aria-current="page">
                        Home
                    </a>
                </li>
                <li>
                    <a href="" className="nav-link text-white">
                        Stall
                    </a>
                </li>
                <li>
                    <a href="" className="nav-link text-white">
                        Product Form
                    </a>
                </li>
                <li>
                    <a href="" className="nav-link text-white">
                        Stall Form
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        Customers
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>test</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={signOut}>Sign out</button></li>
                </ul>
            </div>
        </div>
        );
  }
  
  export default NavBar;