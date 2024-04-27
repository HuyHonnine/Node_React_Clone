import actionTypes from './actionTypes'
import * as service from "../../services";

export const register = (payload) => async (dispatch) => {
    try {
        const response = await service.apiRegister(payload)
         if(response?.data.err === 0){
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
         }else{
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
         }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const response = await service.apiLogin(payload)
         if(response?.data.err === 0){
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
         }else{
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
         }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = () =>({
    type: actionTypes.LOGOUT

})