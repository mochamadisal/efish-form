import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SET_MODAL_ISOPEN} from '~/redux/actions/typeAction';
import {XCircle} from 'react-feather';
import Loading from '~/components/Loading/Loading';

import './modal.scss';

const Modal = ({title, Container, onLoad}) =>{
    const dispatch = useDispatch();
    const global = useSelector((state) => state.global);
    const {modalIsOpen} = global;

    const closeModal = () => {
        dispatch({type: SET_MODAL_ISOPEN, data: false});
    };
    return (
        <Fragment>
            <div className={`modal d-flex align-items-center ${modalIsOpen ? '' : 'd-none'}`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 modal-component d-flex flex-column with-shadow">
                            <div className="modal-title p-3 d-flex align-items-center justify-content-between with-shadow">
                                <h4 className="font-20 font-500">{title}</h4>
                                <XCircle onClick={() => closeModal()} className="font-26 cursor-pointer" />
                            </div>
                            <div className="modal-body flex-grow-1">
                                <Container />
                                {onLoad &&
                                <div className="modal-loading"><Loading /></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Modal;
