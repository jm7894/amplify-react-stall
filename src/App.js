import { Amplify } from 'aws-amplify';

import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './Home/Home';
import NavBar from './NavBar';


import awsExports from './aws-exports';
import { Route, Routes } from 'react-router-dom';
Amplify.configure(awsExports);
// Amplify.configure({
//   "oauth": {
//     "domain": "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_V50juLQIK",
//     "scope": [
//         "phone",
//         "openid", 
//         "profile",
//         "aws.cognito.signin.user.admin",
//         "stall-lambda-api/home"
//     ],
//     "responseType": "code"
// }}
// );


function App() {
    return (
    // <Authenticator>
    //   {({ signOut, user }) => (
    //     <main>
    //       <div className="row">
    //         <div className="col">
    //           <h3>Hello {user.username}</h3>
    //         </div>
    //         <div className="col">
    //           <button onClick={signOut}>Sign out</button>
    //         </div>
    //       </div>
    //       <Home />
    //     </main>
    //   )}
    // </Authenticator>
    <>
    <NavBar />
    <div class="d-flex flex-column p-3 overflow-scroll w-100">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="*" element={ <Home/> } />
      </Routes>
    </div>
  </>

      
    

  );
}
export default withAuthenticator(App)