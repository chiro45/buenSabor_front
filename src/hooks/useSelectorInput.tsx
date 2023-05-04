import React, { useState } from 'react'

export const useSelectorInput = (optionSelector:string[] = []) => {

    const [selectedValue, setSelectedValue] = useState({});


    const [options, setOptions] = useState(optionSelector)
    const onSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
      const {value, name} = event.target;
      console.log(value,name);
       setSelectedValue({[name]:value});
       
    };

  return[selectedValue, onSelectorChange, ]
}
