import './Input.css';

const Input = (props) => {
    return (
        <input onChange={props.onChange} id={props.id} name={props.name} placeholder={props.placeholder} type={props.type} />
    )
}

export default Input;