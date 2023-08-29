import {axiosInstance} from '.'


export const LoginUser = async(payload) =>{
const response = await axiosInstance('post','/api/users/login', payload)
    return response
}

export const RegisterUser = async(payload) =>{
    const response = await axiosInstance('post','/api/users/register', payload)
        return response
    
    }

    export const GetCurrentUser = async() =>{
        const response = await axiosInstance('get','/api/users/get-current-user')
            return response
 
        }
       

    export const GetAllDonorOfAnOrganization = async() => {
        const response = await axiosInstance('get','/api/users/get-all-donors')
        return response
    }


    export const GetAllHospitalOfAnOrganization = async() => {
        const response = await axiosInstance('get','/api/users/get-all-hospotals')
        return response
    }

    export const GetAllOrganizationOfDonor = async() => {
        const response = await axiosInstance('get','/api/users/get-all-organizations-of-a-donor')
        return response
    }

    export const GetAllOrganizationOfHospital = async() => {
        const response = await axiosInstance('get','/api/users/get-all-organizations-of-a-hospital')
        return response
    }