// import React, {Component, useEffect, useState} from "react";


// export default function userHome({userData}) {
//     const logOut = () => {
//         window.localStorage.clear();
//         window.location.href = './sign-in';

//     };

//     return (
//         <div >
//             <div >
//                 <div>
//                 <p>Name</p>
//                 <h1>{userData.uname}</h1>
//                 <p>Email</p>
//                 <h3>{userData.email}</h3>
//                 <hr />
//                 <h5>Hello {userData.uname}</h5>
//                 <br />
//                 <button style={{backgroundColor: '#ffc107', borderColor: '#ffc107', color: 'black'}} onClick={logOut} className="btn btn-primary" type="button">Log Out</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
import React, { useEffect, useState } from "react";
import UserDetails from "../../components/userDetails";
import '../../styles/landinguser.css';

export default function UserHome({ userData }) {
  console.log(userData, "userData");

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const handleHereClick = () => {
    // history.push('/pending project')
    window.location.href = './student-form';
  };

  return (
    <div className="app__userhome">
      <div className="app__userhome-image">
        <img src="https://mujslcm.jaipur.manipal.edu:122/keen/themes/keen/theme/demo1/dist/assets/media/misc/collage.png" alt="background-img" />
      </div>
        <div className="app__userhome-text">
          <p>Name</p>
          <h3>{userData && userData.uname}</h3>
          </div>
          {/* <div>
          <p>Email</p>
          <h3>{userData && userData.email}</h3>
          </div> */}
          <hr />
          <div className="app__userhome-text">
          <h5>Hello, {userData && userData.uname}. You have a pending project allocation. Please click <button onClick={handleHereClick} type="button" className="app__userhome-text-btn">here</button> to complete it.</h5>
          </div>
          {/* <br /> */}
          <div className="app__userhome-btn">
          <button
            style={{
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              color: "black",
            }}
            onClick={logOut}
            className="btn btn-primary"
            type="button"
          >
            Log Out
          </button>
          </div>
        </div>
  );
}
