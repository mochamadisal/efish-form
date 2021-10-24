import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Header from '~/components/Header/Header';
import WidgetFilter from '~/components/WidgetFilter/WidgetFilter';
import WidgetProduct from '~/components/WidgetProduct/WidgetProduct';
import Search from '~/components/Search/Search';
import Button from '~/components/Button/Button';

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
                <div className="box-add-product">
                    <div className="display-add">
                        <Button type="default" label="Filter" action={() => console.log('tes')} customClass="filter-mobile with-shadow"/>
                        <div className="flex-grow-1 d-flex justify-content-end align-items-center align-items-center">
                            <Button type="secondary" label="ADD NEW PRODUCT" action={() => console.log('tes')} customClass="with-shadow"/>
                        </div>
                    </div>
                </div>
                <div className="box-widget-product">
                    <WidgetProduct />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
