import React from 'react';

import Button from '~/components/Button/Button';

import './widgetProduct.scss';

const WidgetFilter = () => {
    return (
        <div className="product-widget">
            <Button type="default" label="Filter" action={() => console.log('tes')} customClass="filter-mobile with-shadow"/>
            <div className="flex-grow-1 d-flex justify-content-end align-items-center align-items-center">
                <Button type="secondary" label="ADD NEW PRODUCT" action={() => console.log('tes')} customClass="with-shadow"/>
            </div>
        </div>
    );
};
export default WidgetFilter;
