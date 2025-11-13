/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import Styles from './index.module.less'
import api from '../../api/index'
import type { ILoginParams } from '../../types/api'
import { useNavigate } from 'react-router'

type FieldType = {
  username?: string
  password?: string
  remember?: boolean
}

const login = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()

  const onFinish: FormProps<ILoginParams>['onFinish'] = async (
    values: unknown,
  ) => {
    try {
      const res = await api.login(values as ILoginParams)
      localStorage.setItem('token', res.data.token)
    } catch (error) {
      console.log(error)
    }

    window.location.href = '/'
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
  }

  const handleLoginClick = async () => {
    try {
      // const values = await form.validateFields()
      handleLogin(0)
    } catch (errorInfo) {
      console.log('验证失败:', errorInfo)
    }
  }

  const handleLogin = (values: unknown) => {
    // 实际的登录处理逻辑
    console.log('登录信息:', values)
    nav('/')
  }

  return (
    <div className={Styles.login}>
      <div className={Styles['loginWrapper']}>
        <div className={Styles.title}> 欢迎使用后台管理系统</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <div></div>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" onClick={handleLoginClick} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default login
