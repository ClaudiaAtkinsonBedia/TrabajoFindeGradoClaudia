import "./formInput.css"

function FormInput(props)
{       
        return (
            <div classname="FormInput">
                <label>Username</label>
                <input placeholder={props.placeholder} onChange={e=>props.setUsername(e.target.value)}/>
            </div>
        );
}
export default FormInput