import React, { createContext, useState } from 'react';

export const userContext = createContext({});

export default function UserContext({ children }) {

    const [userInfo, setUserInfo] = useState();

    return (
        <div>
            <userContext.Provider value={{ userInfo, setUserInfo }}>
                {children}
            </userContext.Provider>
        </div>
    )
}
