import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDataProduct} from '~/api/methodConstApi';
import JsonToForm from 'json-reactform';
import schemaProduct from '~/constants/schemaProduct';
import {SET_MODAL_ISOPEN, SET_PRODUCT_LIST} from '~/redux/actions/typeAction';
import {apiService} from '~/api/actionGeneralApi';

import Header from '~/components/Header/Header';
import WidgetFilter from '~/components/WidgetFilter/WidgetFilter';
import WidgetProduct from '~/components/WidgetProduct/WidgetProduct';
import Search from '~/components/Search/Search';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal/Modal';

import {getSupportData, submitForm, setDataForEdit, updateForm} from '~/mixins';

import './home.scss';


const Homepage = () => {
    const dispatch = useDispatch();
    const dataProduct = useSelector((state) => state.global);
    const {listProduct} = dataProduct;
    const [schema, setSchema] = useState(schemaProduct);
    const [onEdit, setOnEdit] = useState('');
    const [onLoadSchema, setOnLoadSchema] = useState(false);
    const [onLoadSubmit, setOnLoadSubmit] = useState(false);

    const addProduct = () => {
        dispatch({type: SET_MODAL_ISOPEN, data: true});
    };

    const getDataJsonToForm = async () => {
        const newSchema = await getSupportData(schema);
        setSchema(newSchema);
        setOnLoadSchema(true);
    };

    const onSubmitForm = async (params) => {
        setOnLoadSubmit(true);
        const submit = await (onEdit ? updateForm(params, onEdit.uuid) : submitForm(params));
        if (submit.status) {
            getList();
            dispatch({type: SET_MODAL_ISOPEN, data: false});
        }
        setOnLoadSubmit(false);
    };

    const getList = async () =>{
        const listProduct = await apiService(GetDataProduct);
        if (listProduct && listProduct.length > 0) {
            dispatch({type: SET_PRODUCT_LIST, data: listProduct.filter((row) => row.uuid && row.komoditas)});
        };
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

    const editData = (index) => {
        setOnLoadSchema(false);
        const content = (index !== '' ? listProduct[index] : index);
        const newSchema = setDataForEdit(schema, content);
        setSchema(newSchema);
        setOnLoadSchema(true);
        setOnEdit(content);
        if (index !== '') {
            dispatch({type: SET_MODAL_ISOPEN, data: true});
        }
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
                        <WidgetProduct editData={editData} />
                    </div>
                </div>
            </div>
            <Modal title="Add Product" Container={ModalBodyContent} onLoad={onLoadSubmit} />
        </Fragment>
    );
};

export default Homepage;
