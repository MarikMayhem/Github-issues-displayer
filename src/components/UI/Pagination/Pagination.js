import React from 'react';
import './Pagination.scss'

const Pagination = ({ issuesPerPage, totalIssues, paginate }) => {
    const issueNumbers = [];

    for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
        issueNumbers.push(i)
    }

    const passNumber = (e, number) => {
        e.preventDefault()
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        paginate(number)
    }

    return (
        <nav>
            <ul>
                {issueNumbers.map(number => {
                    return <li key={number} className={number === 1 ? "active" : ""} onClick={(e) => passNumber(e, number)} >
                        {number}
                    </li>
                })}
            </ul>
        </nav>
    );
}

export default Pagination;
