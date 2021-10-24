import React, {memo, Fragment, Suspense} from 'react';
import {Helmet} from 'react-helmet';
import Notifications from 'react-notify-toast';

import Loading from '~/components/Loading/Loading';


import './layout.scss';

const MainLayout = memo( ({Container, title}) => {
    return (
        <Fragment>
            <Helmet>
                <title>Efishery Form - {title}</title>
            </Helmet>
            <Suspense fallback={
                <Loading />
            }>
                <div className="main-layout">
                    <Notifications />
                    <Container />
                </div>
            </Suspense>
        </Fragment>
    );
});

MainLayout.displayName = 'mainLayout';

export default MainLayout;
