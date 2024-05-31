import c from '../Profile.module.css';
import { useState } from 'react';

import Button from '../../Button/Button';
import {ReactComponent as DownArrow} from '../../../assets/images/down-arrow-svgrepo-com.svg';

const Modal = (props) => {
    const [closing, setClosing] = useState(false)

    const handleClose = (e) => {
        e.stopPropagation();
        setClosing(true); 
        setTimeout(() => {
            props.onClose()
        }, 130)
    }

    return (
        <div className={c.modal + ' ' + (closing ? c.modal_closing : '')}>
            <div className={c.modal_content}>
                <div className={c.modal_header}>
                    {props.type === "+" ? 'Пополнение' : 'Перевод'} <span>({props.date})</span>
                </div>
                <div className={c.amount}>
                    <span>{props.type + props.total} SOC</span>
                    <div className={c.icon}>$</div>
                </div>

                <div className={c.modal_info}>
                    <span>{props.from}</span>
                    <div>
                        <DownArrow width='20px' height='18px' fill='#fff' id='' />
                        <DownArrow width='20px' height='18px' fill='#fff' id='' />
                        <DownArrow width='20px' height='18px' fill='#fff' id='' />
                    </div>
                    <span>{props.to}</span>
                </div>
                <Button text='Закрыть' event={handleClose} />
            </div>
        </div>
    );
}

export default Modal;