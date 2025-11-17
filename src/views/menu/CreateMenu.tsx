import {
  Modal,
  Form,
  Input,
  TreeSelect,
  message,
  InputNumber,
  Radio,
} from 'antd'
import { useImperativeHandle, useState, forwardRef } from 'react'
import type { IMenu } from '../../types/api'
import api from '../../api'
import { InfoCircleOutlined } from '@ant-design/icons'

interface IProps {
  update: () => void
}

export interface CreateMenuRef {
  openModal: (type: string, data?: IMenu | { parentId: string }) => void
}

const CreateMenuRef = forwardRef<CreateMenuRef, IProps>((props, ref) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [menuList, setMenuList] = useState<IMenu[]>()

  const [action, setAction] = useState<string>('create')
  const getMenuData = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setMenuList(data)
  }

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (!valid) return
    if (action === 'create') {
      await api.createMenu(form.getFieldsValue())
      message.success('创建成功')
    } else if (action === 'edit') {
      await api.updateMenu(form.getFieldsValue())
      message.success('编辑成功')
    }
    handleCancel()
    props.update()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const openModal = (type: string, data?: IMenu | { parentId: string }) => {
    setAction(type)
    setIsModalOpen(true)
    getMenuData()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  useImperativeHandle(ref, () => ({
    openModal,
  }))

  return (
    <>
      <Modal
        title={action === 'create' ? '新增菜单' : '编辑菜单'}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelAlign="left"
          labelCol={{ span: 4 }}
          initialValues={{ menuType: 1, menuState: 1 }}
        >
          <Form.Item hidden name="_id">
            <Input></Input>
          </Form.Item>
          <Form.Item label="上级菜单" name="parent">
            <TreeSelect
              placeholder="请选择上级菜单"
              allowClear
              treeDefaultExpandAll
              treeData={menuList}
              fieldNames={{ label: 'menuName', value: 'id' }}
            />
          </Form.Item>

          <Form.Item label="菜单类型" name="menuType">
            <Radio.Group>
              <Radio value={1}>目录</Radio>
              <Radio value={2}>菜单</Radio>
              <Radio value={3}>按钮</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="菜单名称"
            name="name"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称"></Input>
          </Form.Item>
          <Form.Item
            label="菜单名称"
            noStyle
            shouldUpdate
            name="userName"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            {() => {
              return form.getFieldValue('menuType') === 2 ? (
                <Form.Item label="权限标识" name="menuCode">
                  <Input placeholder="请输入权限标识"></Input>
                </Form.Item>
              ) : (
                <>
                  <Form.Item label="菜单图标" name="icon">
                    <Input placeholder="请输入菜单图标"></Input>
                  </Form.Item>
                  <Form.Item label="路由地址" name="path">
                    <Input placeholder="请输入路由地址"></Input>
                  </Form.Item>
                </>
              )
            }}
          </Form.Item>
          <Form.Item label="组件名称" name="component">
            <Input placeholder="请输入组件名称"></Input>
          </Form.Item>
          <Form.Item
            label="排序"
            name="orderDr"
            tooltip={{
              title: '顺序值越大越靠后',
              icon: <InfoCircleOutlined rev={undefined} />,
            }}
          >
            <InputNumber placeholder="请输入排序值" />
          </Form.Item>
          <Form.Item label="菜单状态" name="menuState">
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default CreateMenuRef
