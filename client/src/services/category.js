import axiosConfig from '../axiosConfig'

export const apiGetCategory = () => new Promise(async(resolve, reject)=>{
    try {
        const response = await axiosConfig({
            method: 'GET',
            url:'/api/v1/category/index',
        })
        resolve(response)
    } catch (error) {
        reject(error);
    }
})