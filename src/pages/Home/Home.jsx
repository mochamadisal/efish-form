import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import JsonToForm from 'json-reactform';
import schemaProduct from '~/constants/schemaProduct';
import {SET_MODAL_ISOPEN} from '~/redux/actions/typeAction';

import Header from '~/components/Header/Header';
import WidgetFilter from '~/components/WidgetFilter/WidgetFilter';
import WidgetProduct from '~/components/WidgetProduct/WidgetProduct';
import Search from '~/components/Search/Search';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal/Modal';

import {getSupportData, submitForm} from '~/mixins';

import './home.scss';


const Homepage = () => {
    const dispatch = useDispatch();
    const [schema, setSchema] = useState(schemaProduct);
    const [onLoadSchema, setOnLoadSchema] = useState(false);
    const [onLoadSubmit, setOnLoadSubmit] = useState(false);

    const addProduct = () => {
        console.log('sssc');
        dispatch({type: SET_MODAL_ISOPEN, data: true});
    };

    const getDataJsonToForm = async () => {
        const newSchema = await getSupportData(schema);
        setSchema(newSchema);
        setOnLoadSchema(true);
    };

    const onSubmitForm = async (params) => {
        setOnLoadSubmit(true);
        const submit = await submitForm(params);
        if (submit.status) {
            dispatch({type: SET_MODAL_ISOPEN, data: false});
        }
        setOnLoadSubmit(false);
    };

    useEffect(() => {
        getDataJsonToForm();
    }, []);

    const ModalBodyContent = () => {
        return (
            <Fragment>
                {onLoadSchema &&
                <JsonToForm model={schema} onSubmit={onSubmitForm} />}
            </Fragment>
        );
    };

    return (
        <Fragment>
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
                                <Button type="secondary" label="ADD NEW PRODUCT" action={() => addProduct()} customClass="with-shadow"/>
                            </div>
                        </div>
                    </div>
                    <div className="box-widget-product">
                        <WidgetProduct />
                    </div>
                </div>
            </div>
            <Modal title="Form Product" Container={ModalBodyContent} onLoad={onLoadSubmit} />
        </Fragment>
    );
};

export default Homepage;
