import React from 'react';

const PublicApiCall = () => {
  const callApi = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/public`
      );

      const responseData = await response.json();

      alert(responseData.message);
    } catch (error) {
      alert('Ocurrio un error');
      console.error(error);
    }
  };

  return (
    <button
      onClick={() => callApi()}
    >
      Public Api Call
    </button>
  );
};

export default PublicApiCall;
