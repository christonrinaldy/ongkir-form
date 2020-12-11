export function setAddress (cityId) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ADDRESS',
            payload: {
                address: cityId
            }
        })
    }
}