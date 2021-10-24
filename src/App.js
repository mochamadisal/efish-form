import React from 'react';

import '~/assets/scss/general.scss';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import routes from '~/routes';

import {Provider} from 'react-redux';
import configureStore from '~/redux';

import Layout from '~/components/Layout/Layout';
import Page404 from '~/pages/Error/Page404';

const App = () =>{
    return (
        <Provider store={configureStore()}>
            <BrowserRouter>
                <Switch>
                    {routes.map(({path, exact, container, title}, i ) => (
                        <Route key={i} path={path} exact={exact} render={ () => (
                            <Layout Container={container} title={title}/>
                        )}/>
                    ))}
                    <Route render={()=><Page404/>}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};
export default App;
