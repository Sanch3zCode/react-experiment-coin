import axios from 'axios';
import c from './Profile.module.css';

import { useEffect, useState } from 'react';

import Balance from './Balance/Balance';
import Operations from './Operations/Operations';
import Transactions from './Transactions/Transactions';

const Profile = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => { 
        const getData = async () => {
            const response = await axios.get('http://192.168.1.156:5000/api/users');
            
            setBalance(response.data.amount);
            setTransactions(response.data.transactions)
        }
        getData()

        const repeatInterval = setInterval(getData, 1500);

        return () => clearInterval(repeatInterval);
    }, [])

    return (
        <>
            <div className={c.profile}>

                <Balance balance={balance} />
                
                <div className={c.line}></div>

                <Operations />
                <Transactions transactions={transactions} />

            </div>
        </>
    )
}

export default Profile;