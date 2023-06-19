import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './CategoryIcon.css';
import { useNavigate } from 'react-router-dom';

interface CategoryIconProps {
  categoryName: string;
  icon: string | IconProp;
  color?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ categoryName, icon, color }) => {
  const iconStyle = {
    backgroundColor: color,
  };
  const navigate = useNavigate();
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <img src={icon} alt="" className="svg-icon" />;
    } else {
      return <FontAwesomeIcon icon={icon} className="fa-icon" />;
    }
  };

  return (
    <div className='category-icon' onClick={()=>{navigate('/store')}}>
      <div className="circunferencia" style={iconStyle}>
        {renderIcon()}
      </div>
      <span className='nameCategory'>{categoryName}</span>
    </div>
  );
};
