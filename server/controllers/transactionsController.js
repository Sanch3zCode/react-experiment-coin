const User = require('../models/user');

class TransactionsController {
    async createTransaction(data) {
        const { id, type, from, to, total, date } = data;
        const user = await User.findOne({ _id: id });

        user.transactions.push({
            type: type,
            from: from,
            to: to,
            total: total,
            date: date
        })
        return await user.save();
    }

    async transfer({from, to, total}) {
        const fromData = await User.findOne({address: from});
        const toData = await User.findOne({address: to});

        if (!fromData || !toData) return 'Not found user/users by address';
        if (fromData.amount < total) return 'Not enough money';
        if (fromData === toData) return "You can't transfer money to yourself";

        fromData.amount -= total;
        toData.amount += total;

        const getFormattedDate = () => {
            const now = new Date();
        
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear());
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const formattedDate = `${day}.${month}.${year} в ${hours}:${minutes}`;
        
            return formattedDate;
        }      

        const fastTransaction = (id, type) => {
            this.createTransaction({
                id: id,
                type: type,
                from: from,
                to: to,
                total: total,
                date: getFormattedDate()
            })
        }

        fastTransaction(fromData._id, '-');
        fastTransaction(toData._id, '+');

        await fromData.save()
        await toData.save()

        return 'Successfully transaction';
    }
}

module.exports = new TransactionsController();