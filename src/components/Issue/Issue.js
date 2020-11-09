import React from 'react';
import UserProfile from '../UI/UserProfile/UserProfile';
import './Issue.scss'

const Issue = (props) => {
    const { title, assignee, state, showComments } = props;
    return (
        <div className="issue">
            <div className="assignee">
                <UserProfile userData={assignee} />
                <p className="issue-state">{state}</p>
            </div>
            <p className="title" onClick={showComments}>{title}</p>
        </div>
    );
}

export default Issue;
