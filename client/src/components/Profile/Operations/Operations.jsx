import c from '../Profile.module.css';

import {ReactComponent as RightArrow} from '../../../assets/images/right-arrow-svgrepo-com.svg';
import {ReactComponent as Plus} from '../../../assets/images/plus-svgrepo-com.svg';
import {ReactComponent as DownArrow} from '../../../assets/images/down-arrow-svgrepo-com.svg';

const Operations = () => {
    return (
        <div className={c.operations}>
            <div className={c.operations_item}>
                <RightArrow width='30px' height='30px' fill='#fff' id='' />
                Перевести
            </div>
            <div className={c.operations_item}>
                <Plus width='30px' height='30px' fill='#fff' id='' />
                Пополнить
            </div>
            <div className={c.operations_item}>
                <DownArrow width='30px' height='30px' fill='#fff' id='' />
                Вывести
            </div>
        </div>
    )
}

export default Operations;