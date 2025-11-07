import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import './index.less'
import api from '../../api/index'
import { ILoginParams } from '../types/api'
const login = () => {
  const onFinish: FormProps<ILoginParams>['onFinish'] = async (
    values: unknown,
  ) => {
    console.log('Success:', values)
    const res = await api.login(values)
    console.log(res)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
  }

  // const submit = async (values: any) => {
  //   const res = await api.login(values)
  //   console.log(res)
  // }
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="title">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType> label="Username" name="username">
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Password" name="password">
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default login
