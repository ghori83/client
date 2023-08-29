import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetAllHospitalOfAnOrganization } from '../../../apicalls/users';
import { Table, message } from 'antd';
import { SetLoading } from '../../../redux/loaderSlice';
import { getDateFormat } from '../../../utilities/helpers';
 

const Hospitals = () => {

const dispatch = useDispatch();
const [data, setData] = useState([]);


    const getData = async () => {
        try {
          dispatch(SetLoading(true));
          const response = await GetAllHospitalOfAnOrganization();
          dispatch(SetLoading(false));
          if(response.success){
            setData(response.data);
          }
          else {
            throw new Error(response.message);
          }
        
        
        } catch (error) {
          message.error(error.message)
          dispatch(SetLoading(false));
        
        }
        }

        const columns = [
{
    title : 'Name',
    dataIndex: 'name',
},
{
    title: "Email",
    dataIndex: 'email',
},
{
    title: 'Phone',
    dataIndex: "phone",
},
{
    title: "Address",
    dataIndex: "address",
},
{
    title: 'Created At',
    dataIndex: "createdAt",
    render: (text) => getDateFormat(text)
},
        ];



        useEffect(() => {
        getData();
        }, [])


  return (
    <div>
<Table columns={columns} dataSource={data} />      
    </div>
  )
}

export default Hospitals
