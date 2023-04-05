import React, { useRef, useState, useEffect }from "react";
import { useHistory } from 'react-router-dom';
import { Avatar } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { ChatEngine } from 'react-chat-engine';

const Chats = () => {

    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async() => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "fc4c8fa4-9e8f-44a7-a266-50728da9c028",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.displayName);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {headers: { "private-key": "d9d4c6b8-59a2-42ce-a8ca-81f7ef4376f7"}}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user,history]);

    // if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    WeChat!
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                userName='RohitBhojwani'
			    userSecret='123123'
			    projectID='fc4c8fa4-9e8f-44a7-a266-50728da9c028'
            />
        </div>
    );
}

export default Chats;