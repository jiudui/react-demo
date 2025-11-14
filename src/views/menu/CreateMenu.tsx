import { Modal, Form, Input, Select, TreeSelect, message } from 'antd'
import { useEffect, useImperativeHandle, useState, forwardRef } from 'react'
import type { IMenu, IUser } from '../../types/api'
import api from '../../api'

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
  const [userList, setUserList] = useState<IUser[]>()

  const [action, setAction] = useState<string>('create')

  useEffect(() => {
    getAllUserData()
  }, [])
  const getAllUserData = async () => {
    const data = await api.getAllUserList()
    setUserList(data)
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
        <Form form={form} labelAlign="left" labelCol={{ span: 4 }}>
          <Form.Item label="上级菜单" name="parent">
            <TreeSelect
              placeholder="请选择上级菜单"
              allowClear
              treeDefaultExpandAll
              treeData={menuList}
              fieldNames={{ label: 'menuName', value: 'id' }}
            />
          </Form.Item>
          <Form.Item
            label="菜单名称"
            name="name"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称"></Input>
          </Form.Item>
          <Form.Item
            label="负责人"
            name="userName"
            rules={[{ required: true, message: '请输入负责人' }]}
          >
            <Select placeholder="请输入负责人">
              {userList?.map((item) => (
                <Select.Option key={item.id} value={item.userName}>
                  {item.userName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default CreateMenuRef
