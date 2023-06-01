import React, { useEffect, useState } from 'react';
import './Sidebar.css';

import { RxHamburgerMenu } from 'react-icons/rx'
import { BsMoonStars } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { FcSearch } from 'react-icons/fc'
import Connection from './Connection';

function Sidebar({ userData, userDataHandler, handleLoginUserData }) {

    const [search, setSearch] = useState('');
    const [noDatafound, setNoDatafound] = useState(false);
    const { avtar, connections, userId } = userData;
    const [connectionData, setConnectionData] = useState(connections);
    const [existLabel, setexistLabel] = useState(false);
    const [dropDownMenu, setDropDownMenu] = useState(false);

    // console.log(userData, 'userData')

    const connectionHandler = (user) => {

        const existingConnection = connections.find((item) => {
            return item.userId === user.userId
        });

        if (existingConnection) {
            setexistLabel(true);
            handleLoginUserData(existingConnection);
        }
        else {

            connections.push(user);

            let allUserData = JSON.parse(localStorage.getItem('users'));

            allUserData.map((user) => {
                if (user.userId === userId) {
                    user.connections = connections;
                }
            });

            localStorage.setItem('users', JSON.stringify(allUserData));

            setConnectionData(connections);

            userData.connections = connections;

            userDataHandler(userData);

            setSearch('');

        }



    }

    const searchHandler = (e) => {
        setSearch(e.target.value);

        if (e.target.value !== '') {
            let allUserData = JSON.parse(localStorage.getItem('users'));

            allUserData = allUserData.filter((user) => user.userId !== userId);

            allUserData = allUserData.filter((userData) =>
                userData.userName.toLowerCase().trim().startsWith((e.target.value).toLowerCase().trim())
            );

            if (allUserData && allUserData.length) {

                setConnectionData(allUserData);
            }
            else {
                setNoDatafound(true);
            }
        }
        else {
            setexistLabel(false)
            setNoDatafound(false);
            setConnectionData(connections);
        }



    }

    // console.log(userData, 'userdata');
    return (
        <aside>
            <header>
                <div className='upper-header'>
                    <div className='profile-img'>
                        <img src={avtar} alt='profile' ></img>
                    </div>
                    <h3>Chats</h3>
                    <div className='humburger-icon' onClick={() => { setDropDownMenu(!dropDownMenu)}}>
                        <RxHamburgerMenu />
                    </div>
                    {
                        dropDownMenu &&
                        <div className='drop-down-menu'>
                            <div>
                                <div className='menu-icon'><BsMoonStars /></div>
                                <div className='text'>Dark Mode</div>
                                <div className="container">
                                    <label className="switch"><input type="checkbox" />
                                        <div></div>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className='menu-icon'><FiLogOut /></div>
                                <div className='text'>Logout</div>
                            </div>
                        </div>
                    }
                </div>
                <div className='search-container'>
                    <input placeholder='Search friends here...' value={search} onChange={searchHandler}></input>
                    <FcSearch />
                </div>
                <hr></hr>
            </header>
            {
                noDatafound ? <h1> no data found </h1> : <Connection connectionsData={connectionHandler} items={connectionData} />
            }
            {
                !connectionData?.length && !noDatafound && <h1>No connection found</h1>
            }
            {
                existLabel && search && <div className='connection-exist-error'>This Name is already exist in your connection</div>
            }

        </aside>
    )
}

export default Sidebar
