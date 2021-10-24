import React from 'react';

const Page404 = () => {
    return (
        <div className="container">
            <div className="col-md-12 text-center d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
                <div className="d-inline-block">
                    <span style={{borderRight: '1px solid #000000'}} className="d-inline-block py-1 px-4">404</span>
                    <span className="d-inline-block pl-3" style={{letterSpacing: 1}}>Page Not Found!</span>
                </div>
            </div>
        </div>
    );
};
export default Page404;
