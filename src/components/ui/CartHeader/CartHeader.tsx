import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

interface CartHeaderProps {
  title: string;
  subtitle: string;
}

export const CartHeader: FC<CartHeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="cart_header">
      <div className="cart_header-container">
        <p onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </p>
        <div className="cart_header-info">
          <h1>{title}</h1>
          <h5>{subtitle}</h5>
        </div>
      </div>
    </div>
  );
};

