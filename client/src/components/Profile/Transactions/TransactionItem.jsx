import c from '../Profile.module.css'; 
import { useState } from 'react';
import { createPortal } from 'react-dom';

import Modal from '../Modal/Modal';

const TransactionItem = (props) => {
    const modalRoot = document.querySelector('#root > div');
    const [showModal, setShowModal] = useState(false);
    const short = str => str.substring(str.length - 4) + '...' + str.substring(0, 5);

    return (
        <div className={c.transaction_item} onClick={() => {setShowModal(true)}}>
            <div className={c.transaсtion_data}>
                <div className={c.icon}><span>$</span></div>
                <div className={c.transaction_info}>
                    {props.type === "+" ? 'Пополнение' : 'Перевод'}
                    <div className={c.transaction_where}>{short(props.from)} -&gt; {short(props.to)}</div>
                </div>
            </div>
            <span className={c.transaction_total}>{props.type + props.total} SOC</span>
            {showModal && createPortal(
                <Modal onClose={() => {setShowModal(false)}} {...props} />,
                modalRoot
            )}
        </div>
    )
} 

export default TransactionItem;