import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const NavContext = createContext();

const NavContextProvider = ({ children }) => {
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(location.pathname.split('/')[1]);

    useEffect(() => {
        switch (location.pathname) {
            case '/blog':
                setActiveTab('blog');
                break;
            case '/courses':
                setActiveTab('courses');
                break;
            case '/learning-path':
                setActiveTab('learning-path');
                break;
            case '/about-us':
                setActiveTab('about-us');
                break;
            case '/careers':
                setActiveTab('careers');
                break;
            case '/bookmark-post':
                setActiveTab('bookmark-post');
                break;
            case '/admin/course':
            case '/admin/blog':
            case '/admin/video':
                setActiveTab('admin');
                break;
            case '/':
                setActiveTab('home');
                break;
            default:
                setActiveTab(null);
        }
    }, [location.pathname]);

    const contextValue = {
        setActiveTab,
        activeTab,
    };

    return (
        <NavContext.Provider value={contextValue}>
            {children}
        </NavContext.Provider>
    );
};

export default NavContextProvider;
