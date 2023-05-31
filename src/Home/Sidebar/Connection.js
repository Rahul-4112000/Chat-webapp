import React from 'react';
import './Connection.css'

function Connection({items, connectionsData}) {

  return (
    <div >
      {
        (items || [] ).map((item) => {

            const { avtar, email, userName, userId } = item;


            // console.log(items,'items')

            return (
                <div onClick={ () => { connectionsData(item) } } >
                    <div className='connection-img'>
                        <img src={avtar} alt='avtar'></img>
                    </div>
                    <div>
                        <p>{userName}</p>
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
