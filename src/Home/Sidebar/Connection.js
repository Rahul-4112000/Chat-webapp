import React from 'react';
import './Connection.css'

function Connection({items, connectionsData}) {

  return (
    <div className='connections-container' >
      {
        (items || [] ).map((item) => {

            const { avtar, email, userName, userId } = item;


            // console.log(items,'items')

            return (
                <div className='connections'  onClick={ () => { connectionsData(item) } } >
                    <div className='profile-img'>
                        <img src={avtar} alt='avtar'></img>
                    </div>
                    <div>
                        <strong>{userName}</strong>
                        <p>{ email && email }</p>
                    </div>
                </div>
            )
        })
      }
    </div>
  )
}

export default Connection
