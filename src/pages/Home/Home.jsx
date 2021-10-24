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

import {getSupportData, submitData, setDataForEdit, updateData, deleteData} from '~/mixins';

import './home.scss';


const Homepage = () => {
    const dispatch = useDispatch();
    const dataProduct = useSelector((state) => state.global);
    const {listProduct} = dataProduct;
    const [schema, setSchema] = useState(schemaProduct);
    const [onEdit, setOnEdit] = useState('');
    const [onDelete, setOnDelete] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [onLoadSchema, setOnLoadSchema] = useState(false);
    const [onLoadSubmit, setOnLoadSubmit] = useState(false);

    const addProduct = () => {
        openModalEditData('');
        dispatch({type: SET_MODAL_ISOPEN, data: true});
        setTitleModal('Add Product');
    };

    const getDataJsonToForm = async () => {
        const newSchema = await getSupportData(schema);
        setSchema(newSchema);
        setOnLoadSchema(true);
    };

    const onSubmitForm = async (params) => {
        setOnLoadSubmit(true);
        const submit = await (onEdit ? updateData(params, onEdit.uuid) : submitData(params));
        if (submit.status) {
            getList();
            dispatch({type: SET_MODAL_ISOPEN, data: false});
        }
        openModalEditData('');
        setOnLoadSubmit(false);
    };

    const getList = async () =>{
        const listProduct = await apiService(GetDataProduct);
        if (listProduct && listProduct.length > 0) {
            dispatch({type: SET_PRODUCT_LIST, data: listProduct.filter((row) => row.uuid && row.komoditas)});
        };
    };

    const openModalEditData = (index) => {
        setTitleModal('Edit Product');
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

    const openModalDeleteData = async (index) => {
        setTitleModal('Delete Product');
        const data = listProduct[index];
        setOnDelete(data);
        dispatch({type: SET_MODAL_ISOPEN, data: true});
    };

    const submitDeleteData = async () =>{
        setOnLoadSubmit(true);
        const submit = await deleteData(onDelete.uuid);
        if (submit.status) {
            setOnDelete('');
            getList();
            dispatch({type: SET_MODAL_ISOPEN, data: false});
        }
        setOnLoadSubmit(false);
    };

    const cancelDeleteContent = () => {
        setOnDelete('');
        dispatch({type: SET_MODAL_ISOPEN, data: false});
    };

    const ModalBodyContent = () => {
        return (
            <Fragment>
                {(onDelete === '' && onLoadSchema) &&
                <JsonToForm model={schema} onSubmit={onSubmitForm} />}
                {onDelete &&
                <div className="d-flex flex-column align-items-center">
                    <h5 className="mb-20p font-18">Are you sure you want to delete <b>{onDelete['komoditas']}</b> ?</h5>
                    <div className="d-flex">
                        <Button type="outline-default" label="Cancel" action={() => cancelDeleteContent()} customClass="mr-12p" />
                        <Button type="outline-danger" label="Yes" action={() => submitDeleteData()} />
                    </div>
                </div>}
            </Fragment>
        );
    };

    useEffect(() => {
        getDataJsonToForm();
    }, []);

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
                        <WidgetProduct editData={openModalEditData} openDialogDeleteData={openModalDeleteData} />
                    </div>
                </div>
            </div>
            <Modal title={titleModal} Container={ModalBodyContent} onLoad={onLoadSubmit} />
        </Fragment>
    );
};

export default Homepage;
