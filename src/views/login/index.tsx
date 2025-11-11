import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import Styles from './index.module.less'
import api from '../../api/index'
import { ILoginParams } from '../../types/api'

type FieldType = {
  username?: string
  password?: string
  remember?: boolean
}

const login = () => {
  const onFinish: FormProps<ILoginParams>['onFinish'] = async (
    values: unknown,
  ) => {
    try {
      const res = await api.login(values)
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
            <Button type="primary" onClick={() => onFinish()} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default login
