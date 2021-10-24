import moment from 'moment';
import {notify} from 'react-notify-toast';
import {v4 as uuidv4} from 'uuid';

const {PostDataProduct, GetDataArea, GetDataSize, PutDataProduct, DeleteDataProduct} = require('~/api/methodConstApi');
const {apiService} = require('~/api/actionGeneralApi');

export const getSupportData = async (param) => {
    const getDataArea = await apiService(GetDataArea);
    const getDataSize = await apiService(GetDataSize);

    const listOfProvince = [];
    const listOfCity = [];
    if (getDataArea && getDataArea.length > 0) {
        getDataArea.forEach((element) => {
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
                listOfCity.push(obj);
            }
        });
    }

    const listOfSize = [];
    if (getDataSize && getDataSize.length > 0) {
        getDataSize.forEach((element) => {
            const obj = {};
            obj.value = element.size;
            obj.label = element.size;
            listOfSize.push(obj);
        });
    }

    param['ukuran'].options = listOfSize;
    param['provinsi'].options = listOfProvince;
    param['kota'].options = listOfCity;

    return param;
};

export const submitData = async (params) => {
    const result = {
        status: false,
    };
    try {
        const data = {
            uuid: uuidv4(),
            komoditas: params['komoditas'],
            area_provinsi: params['provinsi'].value,
            area_kota: params['kota'].value,
            size: params['ukuran'].value,
            price: params['harga'],
            tgl_parsed: moment().format(),
            timestamp: moment().unix(),
        };

        await apiService(PostDataProduct, [data]);
        const myColor = {background: '#274653', text: '#FFFFFF'};
        notify.show('Saving Success', 'custom', 5000, myColor);
        result.status = true;
    } catch (error) {
        result.status = false;
        notify.show(error.response, 'error');
    }

    return result;
};

export const setDataForEdit = (param, content) => {
    param['komoditas'].defaultValue = (content !== '' ? content.komoditas : content);
    param['provinsi'].defaultValue = (content !== '' ? content.area_provinsi : content);
    param['kota'].defaultValue = (content !== '' ? content.area_kota : content);
    param['ukuran'].defaultValue = (content !== '' ? content.size : content);
    param['harga'].defaultValue = (content !== '' ? content.price : content);
    return param;
};

export const updateData = async (params, id) => {
    const result = {
        status: false,
    };
    try {
        const data = {
            komoditas: params['komoditas'],
            area_provinsi: params['provinsi'].value,
            area_kota: params['kota'].value,
            size: params['ukuran'].value,
            price: params['harga'],
            tgl_parsed: moment().format(),
            timestamp: moment().unix(),
        };

        await apiService(PutDataProduct, {
            search: {uuid: id},
            set: data,
        });
        const myColor = {background: '#274653', text: '#FFFFFF'};
        notify.show('Update Success', 'custom', 5000, myColor);
        result.status = true;
    } catch (error) {
        result.status = false;
        notify.show(error.response, 'error');
    }

    return result;
};

export const deleteData = async (id) => {
    const result = {
        status: false,
    };
    try {
        await apiService(DeleteDataProduct, {
            search: {uuid: id},
        });
        const myColor = {background: '#274653', text: '#FFFFFF'};
        notify.show('Delete Success', 'custom', 5000, myColor);
        result.status = true;
    } catch (error) {
        result.status = false;
        notify.show(error.response, 'error');
    }

    return result;
};
