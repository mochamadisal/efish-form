// import moment from 'moment';
import React from 'react';
import {rupiah} from '~/utils/currency';
import moment from 'moment';
import Fish from '~/assets/img/fish.png';

import Button from '~/components/Button/Button';

import './cardProduct.scss';

const cardProduct = ({data, editDataProduct, index}) => {
    return (
        <div className="card mt-12p">
            <img className="card-img-top" src={Fish} alt={data.komoditas} />
            <div className="card-body">
                <h5 className="card-title font-16 font-600 mb-10p">{data.komoditas}</h5>
                <h6 className="font-12 font-300 color-grey text-capitalize">{`${data.area_provinsi.toLowerCase()} - ${data.area_kota.toLowerCase()}`}</h6>
                <h6 className="font-12 color-grey font-300 mt-4p">Size : {data.size}</h6>
                <h6 className="font-12 color-grey font-300 mt-4p">{moment(data.tgl_parsed).format('DD MMMM YYYY')}</h6>
                <h6 className="font-14 font-700 color-primary mt-8p">{rupiah(data.price)}</h6>
                <div className="mt-12p">
                    <Button type="outline-default" label="Edit" action={() => editDataProduct(index)} customClass="with-shadow mr-12p"/>
                    <Button type="outline-danger" label="Remove" action={() => console.log('tes')} customClass="with-shadow"/>
                </div>
            </div>
        </div>
    );
};

export default cardProduct;
