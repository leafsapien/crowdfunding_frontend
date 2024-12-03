import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import MydetailsPage from './pages/MydetailsPage.jsx';
import NewProjectPage from './pages/NewprojectPage.jsx';

import NavBar from './components/NavBar.jsx';
import { AuthProvider } from './components/AuthProvider.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <NavBar />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
            { path: '/mydetails', element: <MydetailsPage /> },
            { path: '/project/:id', element: <ProjectPage /> },
            { path: '/project/new', element: <NewProjectPage /> }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Here we wrap our app in the AuthProvider so it can store the state our user is viewing from depending on if they are logged in! */}
        <AuthProvider>
            {/* Here we wrap our app in the router provider so they render */}
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
