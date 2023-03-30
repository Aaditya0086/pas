// import React, { useEffect, useState } from "react";
// import AdminHome from './adminHome'
// import UserHome from './userHome';

// export default function UserDetails() {
//   const [userData, setUserData] = useState('');
//   const [admin, setAdmin] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/userData", {
//       method: 'POST', 
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         token: window.localStorage.getItem('token'), 
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, 'User Data');

//         if (data.user.userType === 'Admin') {
//           setAdmin(true);
//         }

//         setUserData(data.data);

//         if (data.data === 'token expired') {
//           alert('Session expired login again')
//           window.localStorage.clear();
//           window.location.href = './sign-in';
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return admin ? <AdminHome /> : <UserHome userData={userData} />;
// }
import React, { useEffect, useState } from "react";
import AdminHome from './adminHome'
import UserHome from '../pages/userHome/userHome';

export default function UserDetails() {
  const [userData, setUserData] = useState('');
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'), 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userData');

        if (data.status === 'ok') {
          if (data.data.userType === 'Admin') {
            setAdmin(true);
          }
          setUserData(data.data);
        } else {
          setError(data.message || 'Unknown error');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Unable to fetch user data');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  } else if (admin) {
    return <AdminHome />;
  } else {
    return <UserHome userData={userData} />;
  }
;
}
