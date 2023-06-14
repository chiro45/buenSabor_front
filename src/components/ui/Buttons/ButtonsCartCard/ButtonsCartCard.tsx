import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const ButtonsCartCard = ({increment, decrement, counter, deleted}:any) => {
    return (
        <div className="cart_card-btnContainer">
          {counter > 1 ? (
            <button onClick={() => decrement()}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          ) : (
            <button onClick={()=>deleted()}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          )}
          <h3>{counter}</h3>
          <button onClick={() => increment()}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      );
};
