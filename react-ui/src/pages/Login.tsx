import React, { FC, useContext } from "react";
import { Form, Input, Button } from "antd";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { LoginType } from "../utils/type";

export const Login: FC = function () {
  const { setAuthentication } = useContext(AuthenticationContext);

  const onFinish = (formData: LoginType) => {
    console.log(formData);
    setAuthentication({
      credentials: formData,
    });
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${formData.clientId}&response_type=code&redirect_uri=http://localhost:3000/playlist&scope=streaming%20user-read-email%20user-read-private%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public`;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mt-11 w-full">
      <h1 className="text-center text-4xl">Login</h1>
      <div className="mx-auto mt-4 w-9/12">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="clientId"
            rules={[{ required: true, message: "Please input your username!" }]}
            initialValue={"db65b796543848cd832fcc8a143a9f06"}
          >
          </Form.Item>

          <Form.Item
            label="Password"
            name="clientSecret"
            rules={[{ required: true, message: "Please input your password!" }]}
            initialValue={"63cfbf269b39438da73931a7a98591df"}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 8, span: 8 }}
            className="text-center"
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
