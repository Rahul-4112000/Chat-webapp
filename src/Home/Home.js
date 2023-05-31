import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import browserHistory from 'react-router';
import Rightcolumn from './Chat/Rightcolumn';

import Sidebar from './Sidebar/Sidebar';

function Home() {


  const navigate = useNavigate();
  const location = useLocation();

  let { state: userDetails } = location;

  const users = JSON.parse(localStorage.getItem('users'))

  userDetails = users.find(item => item.userId === userDetails.userId)

  const [userData, setUserData] = useState(userDetails);
  const [chattingUserData, setChattingUserData] = useState(false);

  useEffect(() => {

    if (!userDetails) {
      navigate('/');
    }

  }, []);

  const handleUserData = (user) => {
    setUserData(user)
  }

  const handleLoginUserData = (user) => {
    setChattingUserData(user)
  }


  // console.log(userDetails, 'userDetails');

  // console.log(chatingUserData,'chattingUserData')

  return (
    <div className='container' >
      <div className='wrapper'>
        <Sidebar userData={userData} userDataHandler={handleUserData} handleLoginUserData={handleLoginUserData} />
        {
        <Rightcolumn chattingUserData={chattingUserData} loginUserData={userData} />
        }
      </div>
    </div>
  )
}

export default Home
