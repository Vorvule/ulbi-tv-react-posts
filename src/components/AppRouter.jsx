import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { privateRoutes, publicRoutes } from '../router/routes';
import Loader from './ui/loader/Loader';

const AppRouter = () => {

    const { isAuth, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        key={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/posts' />
            </Switch >
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        key={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/login' />
            </Switch >
    )
}

export default AppRouter
