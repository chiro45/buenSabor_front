import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

interface CartHeaderProps {
  title: string;
  subtitle: string;
}

export const CartHeader: FC<CartHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="cart_header">
      <div className="cart_header-container">
        <Link className="cart_header-link" to={'/'}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="cart_header-info">
          <h1>{title}</h1>
          <h5>{subtitle}</h5>
        </div>
      </div>
    </div>
  );
};

