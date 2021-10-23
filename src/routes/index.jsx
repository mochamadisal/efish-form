import {lazy} from 'react';

const Homepage = lazy( () => import('~/pages/HomePage/Homepage') );

const routes = [
    {title: 'Homepage', container: Homepage, exact: true, path: '/', layout: true, sidebar: true},
];

export default routes;
