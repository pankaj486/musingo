import React, { useState, useEffect } from 'react';
import {service as authService} from '../services/AuthService/authService'

const useLoginState = (props) => {
    const [currentUser, setCurrentUser] = useState(authService.get_current_user());
    
    function handleStatusChange(user) {
        setCurrentUser(user);
    }

    useEffect(() => {
        authService.subscribeOnLogin(handleStatusChange);
        
        return () => {
            authService.unsubscribeOnLogin(handleStatusChange);
        };
    })
    
    return currentUser;
}

export {useLoginState};