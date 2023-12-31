import { axiosInstance } from ".";

export const addInventory = (data) => {
    return axiosInstance('post','/api/inventory/add',data)  
};

export const  GetInventory = () => {
    return axiosInstance('get','/api/inventory/get')  
};

export const  GetInventoryWithFilters = (data) => {
    return axiosInstance('post','/api/inventory/filter',{filters:data})  
};