import { useState } from "react";

export const ItemDelivery = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='containerItemDelivery'>
            <div>1</div>
            <div>
                <label className="switch">
                    <input type="checkbox" checked={isChecked} onChange={handleChange} />
                    <span className="slider round" />
                </label>
            </div>
            <div style={{
                width: '100%',
                height: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <button className="buttonViewItemOrder">Ver</button>
            </div>
            <div>Tomas thomas 259</div>
        </div>
    )
}