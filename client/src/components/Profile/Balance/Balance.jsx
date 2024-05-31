import c from '../Profile.module.css';

const Balance = ({ balance }) => {
    return (
        <div className={c.balance}>
            Ваш баланс:
            <div className={c.coins}>
                <div className={c.icon}><span>$</span></div>
                <span style={{marginLeft: "10px"}}>{balance} SOC</span>
            </div>
        </div>
    )
}

export default Balance;