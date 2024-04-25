import './sass/App.sass'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Home from './components/home';
import Character from './components/character';
import Nav from './components/nav';
import SelectedCharacter from './components/selectedCharacter';

interface RouteConfig {
    path: string;
    element: React.ReactNode;
}

const routes: RouteConfig[] = [
    { path: '/', element: <Home /> },
    { path: '/characters', element: <Character /> },
    { path: '/characters/:characterName', element: <SelectedCharacter /> }
];

function App() {

    const {id} = useParams()
    console.log(id)
    return (
        <>
            <Router>
                <Nav></Nav>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </Router>
        </>
    )
}

export default App
