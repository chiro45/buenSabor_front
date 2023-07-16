import { FC } from 'react';
import './ButtonsTableCaseRegister.css'
interface ActionButton {
    element: any,
    textButton: string;
    className: string;
    fnOnclick: () => void;
}


export const ButtonsTableCaseRegister: FC<ActionButton> = ({ element, className, fnOnclick, textButton }) => {
    
    const handleOnclickButton = () => {
        fnOnclick()
    }
    const handleState = ()=>{
        return className
    }


    return (
        <div className='container__ButtonsTableCaseRegister'>
            <button  key={element.numeroPedido}
                className={` ${handleState()}`}
                onClick={handleOnclickButton}>
                {textButton}
            </button>
        </div>
    )
}
