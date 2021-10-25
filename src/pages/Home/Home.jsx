import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDataProduct, GetDataArea, GetDataSize} from '~/api/methodConstApi';
import JsonToForm from 'json-reactform';
import schemaProduct from '~/constants/schemaProduct';
import {SET_MODAL_ISOPEN, SET_PRODUCT_LIST, SET_PROVINCE_DATA, SET_CITY_DATA, SET_SIZE_DATA} from '~/redux/actions/typeAction';
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
    const [showFilter, setShowFilter] = useState(false);
    const [onLoadSchema, setOnLoadSchema] = useState(false);
    const [onLoadSubmit, setOnLoadSubmit] = useState(false);

    const addProduct = () => {
        setOnDelete('');
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
        setOnDelete('');
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

    const getListOfLocatiion = async () =>{
        const listOfProvince = [];
        const listOfCity = [];
        const resData = await apiService(GetDataArea);

        if (resData && resData.length > 0) {
            resData.forEach((element) => {
                const checkDoubleProvince = listOfProvince.find((row) => row.label === element.province);
                if (!checkDoubleProvince) {
                    const obj = {};
                    obj.value = element.province;
                    obj.label = element.province;
                    listOfProvince.push(obj);
                }
                const fcheckDoubleCity = listOfCity.find((row) => row.label === element.city);
                if (!fcheckDoubleCity) {
                    const obj = {};
                    obj.value = element.city;
                    obj.label = element.city;
                    obj.province = element.province;
                    listOfCity.push(obj);
                }
            });
        }
        if (listOfProvince && listOfProvince.length > 0) {
            dispatch({type: SET_PROVINCE_DATA, data: listOfProvince});
        };

        if (listOfCity && listOfCity.length > 0) {
            dispatch({type: SET_CITY_DATA, data: listOfCity});
        };
    };

    const getListOfSize = async () =>{
        const listOfSize = [];
        const resData = await apiService(GetDataSize);

        if (resData && resData.length > 0) {
            resData.forEach((element) => {
                const obj = {};
                obj.value = element.size;
                obj.label = element.size;
                listOfSize.push(obj);
            });
        }
        if (listOfSize && listOfSize.length > 0) {
            dispatch({type: SET_SIZE_DATA, data: listOfSize});
        };
    };

    const listOfSort = [
        {value: 'price-asc', label: 'Harga Termurah'},
        {value: 'price-desc', label: 'Harga Termahal'},
        {value: 'size-asc', label: 'Ukuran Terkecil'},
        {value: 'size-desc', label: 'Ukuran Terbesar'},
        {value: 'area_kota-asc', label: 'Kota (A-Z)'},
        {value: 'area_kota-desc', label: 'Kota (Z-A)'},
        {value: 'area_provinsi-asc', label: 'Provinsi (A-Z)'},
        {value: 'area_provinsi-desc', label: 'Provinsi (Z-A)'},
        {value: 'komoditas-asc', label: 'Komoditas (A-Z)'},
        {value: 'komoditas-desc', label: 'Komoditas (Z-A)'},
    ];

    const hideFilter = (param) => {
        setShowFilter(param);
    };


    useEffect(() => {
        getListOfLocatiion();
        getListOfSize();
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
                    <div className="box-action d-flex flex-column">
                        <div className={`box-widget-filter ${showFilter ? 'show-in-mobile' : ''}`}>
                            <WidgetFilter listOfSort={listOfSort} setFilter={hideFilter}/>
                        </div>
                        <div className="box-add-product">
                            <div className="display-add">
                                <Button type="default" label="Filter" action={() => setShowFilter(!showFilter)} customClass="filter-mobile with-shadow"/>
                                <div className="flex-grow-1 d-flex justify-content-end align-items-center align-items-center">
                                    <Button type="secondary" label="ADD NEW PRODUCT" action={() => addProduct()} customClass="with-shadow"/>
                                </div>
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
