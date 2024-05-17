import { useState } from "react";
import './FormInput.css';

function FormInput(props) {       
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = (e) =>
        {
            setFocused(true);
        };

    
     const InputComponent = props.type === "textarea" ? "textarea" : "input";

        return (
            <div classname="FormInput">
                <label>{label}</label>
                <InputComponent className="col-lg-10 mx-auto"
                    {...inputProps}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={()=>
                        inputProps.name==="message" && setFocused(true)
                    }
                    focused={focused.toString()}
                />
                <span>{errorMessage}</span>
            </div>
        );
}
export default FormInput;