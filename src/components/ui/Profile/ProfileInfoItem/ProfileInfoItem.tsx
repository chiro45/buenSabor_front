import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ProfileInfoItem = ({icon, datap}:any) => {
  return (
    <div className='profile_information-item'>
            <FontAwesomeIcon icon={icon} />
            <p>{datap}</p>
          </div>
  )
}

export default ProfileInfoItem
