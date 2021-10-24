import React from 'react';
import './header.scss';
import Logo from '~/assets/img/logo.png';
import User from '~/assets/img/user.png';
import Search from '~/components/Search/Search';

const Banner = () => {
    return (
        <div className="header with-shadow d-flex background-primary ">
            <div className="box-header">
                <img className="logo" src={Logo} alt="logo" />
                <div className="serch-box">
                    <Search />
                </div>
                <div className="flex-grow-1 d-flex justify-content-end align-items-center align-items-center">
                    <img className="user-img mr-8p" src={User} alt="user" />
                    <h1 className="font-400 color-white font-16">Mochamad Isal</h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;
