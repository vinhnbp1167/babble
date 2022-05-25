import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine, ChatHeader } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

import LogoutIcon from '../assets/logout.png'
import axios from 'axios';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }
    
    const handleCall = async () => {
        console.log('hi');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => setLoading(false))
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile((user.photoURL && user.photoURL.trim()) ? user.photoURL : "https://gravatar.com/avatar/ff3e8d6af8644f6a44abd4fd10821688?s=400&d=robohash&r=x")
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log('Error: ', error))
                })
        })
    }, [user, history]);

    // if (!user || loading) return "Loading...";

    function renderHeader(chat) {
        if (!chat) return <></>;
        const date = new Date(chat.last_message.created);
        return (
            <div className='ce-chat-title-container'>
                <div className='ce-chat-title-text'>
                    {chat.title}
                </div>
                <div className='ce-chat-subtitle-text'>
                    Active {date.toLocaleDateString('en', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        localeMatcher: 'lookup'
                    })}
                </div>
                <div className='logout-tab' onClick={handleCall}>
                    <LocalPhoneIcon style={{ fill: '#002766' }} />
                </div>
            </div>
        )
    }

    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Babble
                </div>
                
                <div onClick={handleLogout} className="logout-tab channel-list__sidebar__icon2">
                    <div className="icon1__inner" onClick={handleLogout}>
                        <img src={LogoutIcon} alt="Logout" width="30" />
                    </div>
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
                renderChatHeader={(chat) => renderHeader(chat)}
                offset={-4}
            />
        </div>
    )
}

export default Chats;