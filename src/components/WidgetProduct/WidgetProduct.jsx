import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDataProduct} from '~/api/methodConstApi';
import {apiService} from '~/api/actionGeneralApi';
import {SET_PRODUCT_LIST} from '~/redux/actions/typeAction';

import CardProduct from '~/components/CardProduct/CardProduct';

import './widgetProduct.scss';


const WidgetFilter = () => {
    const dispatch = useDispatch();
    const content = useSelector((state) => state.global);
    const {listProduct} = content;

    useEffect(() => {
        const getList = async () =>{
            const listProduct = await apiService(GetDataProduct);
            if (listProduct && listProduct.length > 0) {
                dispatch({type: SET_PRODUCT_LIST, data: listProduct.filter((row) => row.uuid && row.komoditas)});
            };
        };
        getList();
    }, []);
    return (
        <div className="product-widget">
            <div className="row">
                {listProduct.map((row, i) => {
                    return (
                        <div className="col-lg-3" key={i}>
                            <CardProduct data={row} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default WidgetFilter;
