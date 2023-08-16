
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";


const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <GlobalContext.Provider value={{ setIsLoggedIn, isLoggedIn}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);