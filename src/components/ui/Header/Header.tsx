
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { addSearchActive, removeSearchActive, startAddProductStore } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer";
import { useNavigate } from "react-router-dom";
import { useAccessToken, useInput } from "../../../hooks";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { alertError } from "../../../functions/alerts";
export const Header = () => {

  const [inputState, onInputChange, setInputState]: any = useInput({
    search: ""
  })


  const dispatch = useDispatch()
  const headers = useAccessToken();
  const navigate = useNavigate()
  const search = useSelector((state: any) => state.StoreProductReducer.busqueda)
  useEffect(() => {
    setInputState({
      search
    })
    if(search !== ""){
      const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/buscar_nombre/${search}`
      dispatch(startAddProductStore(url, headers))
      navigate('/store')
    }
  }, [search])
  
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if(inputState.search !==""){
        dispatch(addSearchActive(inputState.search))
      }
    }
  };
 
  return (
    <div className="containerHeaderPage__storePage">
      <div className="containerImgLogo__storePage" onClick={()=>{
        navigate('/')
        dispatch(removeSearchActive())
        }}>
        <img src="/src/assets/logopng.webp" />
      </div>
      <div className="containerInputStore__storePage">
        <input name='search'
          onKeyDown={handleSearch}
          value={inputState.search}
          onChange={onInputChange}
          className="InputStore__storePage"
          type="text"
          placeholder="Busca un producto" />
      </div>
      <div className="containerActionsStore__storePage">
        <button className="buttonActionStoreButton__storePage">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </div>
  );
}
