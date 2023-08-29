import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { getAntdInputValidation } from "../../utilities/helpers";

const Login = () => {
  const [type, setType] = useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      console.log(values);
      const response = await LoginUser({
        ...values,
        userType: type,
      });

      console.log(response);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        throw new Error(response.message, "this is form login throw error...");
      }
    } catch (error) {
      dispatch(SetLoading(false));

      console.log("error form on finish function in login page");
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid p-5 gap-5 w-1/3"
        onFinish={onFinish}
      >
        <h1 className=" uppercase text-2xl">
          <span className="text-primary">
            {" "}
            {type.toLocaleUpperCase()} - LOGIN{" "}
          </span>
          <hr />
        </h1>

        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          className=""
          value={type}
        >
          <Radio value="donor">Donor </Radio>
          <Radio value="hospital">Hospital </Radio>
          <Radio value="organization">Organization </Radio>
        </Radio.Group>

        <Form.Item label="Email" name="email" rules={getAntdInputValidation()}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={getAntdInputValidation()}
        >
          <Input type="password" />
        </Form.Item>

        <Button type="primary" className="" htmlType="submit">
          Login
        </Button>
        <Link to="/register" className=" text-center text-gray-700 underline">
          Don,t have an account? Register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
