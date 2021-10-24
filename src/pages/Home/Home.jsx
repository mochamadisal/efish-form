import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Header from '~/components/Header/Header';
import WidgetFilter from '~/components/WidgetFilter/WidgetFilter';
import WidgetProduct from '~/components/WidgetProduct/WidgetProduct';
import Search from '~/components/Search/Search';

import './home.scss';


const Homepage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'GET_DATA'});
    }, [dispatch]);
    return (
        <div className="h-100 homepage-container">
            <Header />
            <div className="box-container">
                <div className="search-mobile background-white">
                    <Search />
                </div>
                <div className="box-widget-filter">
                    <WidgetFilter />
                </div>
                <div className="box-widget-product mt-2">
                    <WidgetProduct />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
