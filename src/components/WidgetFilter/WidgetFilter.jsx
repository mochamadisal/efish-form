import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SORT_DATA, FILTER_DATA} from '~/redux/actions/typeAction';

import Select from '~/components/Select/Select';
import Button from '~/components/Button/Button';

import './widgetFilter.scss';

const WidgetFilter = ({listOfSort, setFilter}) => {
    const dispatch = useDispatch();
    const global = useSelector((state) => state.global);
    const {listOfProvince, listOfCity, listOfSize} = global;
    const [getProvince, setProvince] = useState('');

    const sortData = (params, model) => {
        dispatch({type: SORT_DATA, data: params});
    };

    const filterData = (params, model) => {
        const obj = {
            model: model,
            value: params,
        };
        if (model == 'province') {
            setProvince(params);
        }
        dispatch({type: FILTER_DATA, data: obj});
    };

    const actionSetFilter = (param) => {
        setFilter(param);
    };

    return (
        <div className="filter-widget background-white">
            <div className="w-100">
                <div className="row">
                    <div className="col-lg-3 select-form">
                        <Select title="Filter Provinsi" data={listOfProvince} action={filterData} model='province' />
                    </div>
                    <div className="col-lg-3 select-form">
                        <Select title="Filter Kota" data={listOfCity} action={filterData} model='city' filter={getProvince} />
                    </div>
                    <div className="col-lg-3 select-form">
                        <Select title="Filter Ukuran" data={listOfSize} action={filterData} model='size' />
                    </div>
                    <div className="col-lg-3 select-form">
                        <Select title="Sort Data" data={listOfSort} action={sortData} model='sort' />
                    </div>
                    <div className="col-lg-3 mt-28p button-mobile-submit">
                        <Button type="secondary" label="Lihat hasil" action={() => actionSetFilter(false)} customClass="with-shadow w-100"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WidgetFilter;
