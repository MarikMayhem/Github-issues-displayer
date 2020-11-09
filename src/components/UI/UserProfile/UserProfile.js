import React from 'react';
import './UserProfile.scss'
const UserProfile = (props) => {
    let userProfile = <p>No assignee</p>;
    if (props.userData) {
        const { login, avatar_url, html_url } = props.userData;
        userProfile = <div className="user-profile">
            <a href={html_url}>
                <img className="avatar" src={avatar_url} alt="avatar" />
            </a>
            <p>{login}</p>
        </div>
    }

    return userProfile
}

export default UserProfile;
