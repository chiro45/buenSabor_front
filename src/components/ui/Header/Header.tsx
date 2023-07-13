
import "./Header.css"
import { useDispatch } from "react-redux";
import { addSearchActive, removeCategoryActive, removeSearchActive, startAddProductStore } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer";
import { useNavigate } from "react-router-dom";
import { useAccessToken, useInput } from "../../../hooks";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { alertError } from "../../../functions/alerts";
import DropdownLogin from "../DropdownLogin/DropdownLogin";

export const Header = () => {

  const [inputState, onInputChange, setInputState]: any = useInput({
    busqueda: ""
  })


  const dispatch = useDispatch()
  const headers = useAccessToken();
  const navigate = useNavigate()
  const {busqueda, orderPriceActive} = useSelector((state: any) => state.StoreProductReducer)
  
  useEffect(() => {
    onSearched()
  }, [busqueda]);

  const onSearched = async() =>{
    if(busqueda !== ""){
      const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/allByName/0/${orderPriceActive || 'default'}/${busqueda || 'default'}`
      dispatch(startAddProductStore(url, headers)).then(() =>{ navigate('/store')})
      
     
    }
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if(inputState.busqueda !==""){
        dispatch(addSearchActive(inputState.busqueda))
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
        <input name='busqueda'
          onKeyDown={handleSearch}
          value={inputState.busqueda}
          onChange={onInputChange}
          className="InputStore__storePage"
          type="text"
          placeholder="Busca un producto" />
      </div>
      <div className="containerActionsStore__storePage">
        <DropdownLogin/>
      </div>
    </div>
  );
}
