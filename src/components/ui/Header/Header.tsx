
import "./Header.css"
import { useDispatch } from "react-redux";
import { addSearchActive, removeCategoryActive, removeSearchActive, startAddProductStore } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer";
import { useNavigate } from "react-router-dom";
import { useAccessToken, useInput } from "../../../hooks";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DropdownLogin from "../DropdownLogin/DropdownLogin";
import useUserRole from "../../../hooks/useUserRole";
import { useAuth0 } from "@auth0/auth0-react";


export const Header = () => {
  const [inputState, onInputChange, setInputState]: any = useInput({
    busqueda: ''
  });

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { rol, loading } = useUserRole();
  const dispatch = useDispatch();
  const headers = useAccessToken();
  const navigate = useNavigate();
  const { busqueda, orderPriceActive } = useSelector((state: any) => state.StoreProductReducer);

  useEffect(() => {
    onSearched();
  }, [busqueda]);

  const onSearched = async () => {
    if (busqueda !== '') {
      const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/allByName/0/${orderPriceActive || 'default'}/${busqueda || 'default'}`;
      dispatch(startAddProductStore(url, headers)).then(() => {
        navigate('/store');
      });
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (inputState.busqueda !== '') {
        dispatch(addSearchActive(inputState.busqueda));
      }
    }
  };

  return (
    <div className="containerHeaderPage__storePage">
      <div className="containerImgLogo__storePage" onClick={() => {
        navigate('/');
        dispatch(removeSearchActive());
      }}>
        <img src="/src/assets/logopng.webp" />
      </div>
      {loading ? (
        <h4>Cargando...</h4> // Muestra 'Cargando...' mientras se obtiene el rol
      ) : (
        <div className="containerInputStore__storePage">
          {isAuthenticated && (rol === 'CLIENTE' || rol === 'CAJERO') ? (
            <input
              name="busqueda"
              onKeyDown={handleSearch}
              value={inputState.busqueda}
              onChange={onInputChange}
              className="InputStore__storePage"
              type="text"
              placeholder="Busca un producto"
            />
          ) : (
            isAuthenticated ? (
              <h4 style={{ color: 'white' }}>{rol}</h4>
            ) : (
              <h4 style={{ color: 'white' }}></h4>
            )
          )}
        </div>
      )}
      <div className="containerActionsStore__storePage">
        <DropdownLogin />
      </div>
    </div>
  );
};