import c from '../Profile.module.css';
import TransactionItem from './TransactionItem';

const Transactions = ({ transactions }) => {
    const transactionsItems = transactions.reverse().map(item => <TransactionItem {...item} />);

    return (
        <div className={c.transactions}>
            <div className={c.transactions_header}>
                История транзакций
                <a className={c.transactions_open} href='#'>Открыть</a>
            </div>

            <div className={c.transactions_list}>
                {transactionsItems}
            </div>
        </div>
    )
}

export default Transactions;