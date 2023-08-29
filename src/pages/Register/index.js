import { Button, Form, Input, Radio, message } from 'antd'
import { Link ,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import OrgHospitalForm from './orgHospitalForm'
import { RegisterUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../redux/loaderSlice'
import { getAntdInputValidation } from '../../utilities/helpers'


const Register = () => {

    const [type, setType] = useState('donor')
const    dispatch = useDispatch();
const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('on finish handler is calling')
        try {
            dispatch(SetLoading(true));
            const response = await RegisterUser({
                ...values,
                userType: type,
            });
            dispatch(SetLoading(false));
            if (response.success) {
                message.success(response.message)
                navigate('/login')
            }
            else {
                throw new Error(response.message)
            }

        } catch (error) {
            dispatch(SetLoading(false));

            console.log('error from on finish register', error)
            message.error(error.message)
        }

    }
    useEffect(()=> {
        if(localStorage.getItem('token')){
          navigate('/')
        }
      },[])

    return (
        <div className='flex h-screen items-center justify-center bg-primary'>
            <Form layout='vertical' className='bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2' onFinish={onFinish}>
                <h1 className='col-span-2 uppercase text-2xl'>
                    <span className='text-primary'> {type.toLocaleUpperCase()} - REGISTRATION </span><hr />
                </h1>

                <Radio.Group onChange={(e) => setType(e.target.value)} className='col-span-2' value={type}>
                    <Radio value="donor">Donor </Radio>
                    <Radio value="hospital">Hospital </Radio>
                    <Radio value="organization">Organization </Radio>
                </Radio.Group>

                {type === "donor" && <> <Form.Item label='Name' name="name" rules={getAntdInputValidation()}>
                    <Input />
                </Form.Item>
                    <Form.Item label='Email' name="email" rules={getAntdInputValidation()}>
                        <Input />
                    </Form.Item><Form.Item label='Phone' name="phone" rules={getAntdInputValidation()}>
                        <Input />
                    </Form.Item><Form.Item label='Password' name='password' rules={getAntdInputValidation()}>
                        <Input type="password" />
                    </Form.Item>
                </>}

                {type !== "donor" && <OrgHospitalForm type={type} />}

                <Button type='primary' className='col-span-2' htmlType='submit' >
                    Register
                </Button>
                <Link to="/login" className='col-span-2 text-center text-gray-700 underline'>
                    Already have an account? Login
                </Link>
            </Form>
        </div>
    )
}

export default Register
