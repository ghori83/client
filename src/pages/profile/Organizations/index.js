import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetAllOrganizationOfDonor, GetAllOrganizationOfHospital } from '../../../apicalls/users';
import { Modal, Table, message } from 'antd';
import { SetLoading } from '../../../redux/loaderSlice';
import { getDateFormat } from '../../../utilities/helpers';
import InventoryTable from '../../../components/InventoryTable';
 

const Organization = ({userType}) => {

const [showHistoryModal, setShowHistoryModal] = useState(false)
const currentUser = useSelector((state) => state.users) 
const dispatch = useDispatch();
const [data, setData] = useState([]);
const [selectedOrganization,setSelectedOrgazination] = useState(null)

    const getData = async () => {
        try {
          dispatch(SetLoading(true));
          let response = null;
          if(userType==="hospital"){
            response = await GetAllOrganizationOfHospital()
          } 
          else{
            response = await GetAllOrganizationOfDonor()

          }

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
    title : 'Organization Name',
    dataIndex: 'organizationName',
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
  title:"Address",
  dataIndex: "address"
},
{
    title: 'Created At',
    dataIndex: "createdAt",
    render: (text) => getDateFormat(text)
},
{
  title:"Action",
  dataIndex:"action",
  render: (text,record) => ( 
    <span
    className='underline text-md cursor-pointer'
    onClick={() => {
      setSelectedOrgazination(record)
      setShowHistoryModal(true)
    }}
    >
    History
    </span>
  )
},
        ];



        useEffect(() => {
        getData();
        }, [])


  return (
    <div>
<Table columns={columns} dataSource={data} />      

{showHistoryModal && (
<Modal
title={ `
 ${userType==='donor'
? "Donation History" 
: "Consumption History"
 } In ${selectedOrganization.organizationName}
 `}
centered
open={showHistoryModal}
onClose={()=> setShowHistoryModal(false)}
width={1000}
onCancel={()=> setShowHistoryModal(false)}
>

<InventoryTable  
filters={{
  organization: selectedOrganization._id,
  [userType]: currentUser._id
}}
/>

</Modal> )}
    </div>
  )
}

export default Organization
