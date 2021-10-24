export const getDataAction = () => ({
    type: 'GET_DATA',
});

export const getDataSuccessAction = (param) => ({
    type: 'GET_DATA_SUCCESS',
    payload: param,
});
