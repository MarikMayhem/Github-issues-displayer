import React from 'react';
import UserProfile from '../UI/UserProfile/UserProfile'
import './Comment.scss'

const Comment = ({ body, user, createdAt }) => {
    const formatDate = new Date(createdAt).toLocaleString()
    return (
        <div className="comment">
            <UserProfile userData={user} />
            <p className="comment-body">
                {body}
            </p>
            <p className="comment-date">
                {formatDate}
            </p>
        </div>
    );
}

export default Comment;
