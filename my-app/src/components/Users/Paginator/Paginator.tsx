import classNames from 'classnames';
import React, { useState } from 'react';
import s from './paginator.module.css';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (p: number) => void
    currentPage: number
}

const Paginator: React.FC<PropsType> = ({ totalUsersCount, pageSize, onPageChanged, currentPage }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionSize = 10;
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div className={s.paginator}>
            {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }} >Prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={classNames({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)}
                        key={p}
                        onClick={() => { onPageChanged(p) }} >
                        {p} </span>
                })}
            {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }} >Next</button>}
        </div>
    )
}

export default Paginator;