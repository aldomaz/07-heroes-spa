import React from 'react';
import { LoginPage } from '../auth';
import { Route, Routes } from 'react-router-dom';
import { HeroesRoutes } from '../heroes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route
                    path='/login'
                    element={
                        <PublicRoute>
                            {/* <Route path='/*' element={<LoginPage/>}/> */}
                            <LoginPage/>
                        </PublicRoute>
                    }
                />
                <Route path='/*' element={
                    <PrivateRoute>
                        <HeroesRoutes/>
                    </PrivateRoute>
                }/>
            </Routes>  
        </>
    )
}