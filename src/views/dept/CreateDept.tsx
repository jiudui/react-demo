import { Modal, Form, Input, Select, TreeSelect, message } from 'antd'
import { useEffect, useImperativeHandle, useState, forwardRef } from 'react'
import type { IDept, IUser } from '../../types/api'
import api from '../../api'

interface IProps {
  update: () => void
}

export interface CreateDeptRef {
  openModal: (type: string, data?: IDept | { parentId: string }) => void
}

const CreateDept = forwardRef<CreateDeptRef, IProps>((props, ref) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [depthList, setDepthList] = useState<IDept[]>()
  const [userList, setUserList] = useState<IUser[]>()

  const [action, setAction] = useState<string>('create')

  useEffect(() => {
    getAllUserData()
  }, [])
  const getDeptData = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setDepthList(data)
  }

  const getAllUserData = async () => {
    const data = await api.getAllUserList()
    setUserList(data)
  }

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (!valid) return
    if (action === 'create') {
      await api.createDept(form.getFieldsValue())
      message.success('创建成功')
    } else if (action === 'edit') {
      await api.updateDept(form.getFieldsValue())
      message.success('编辑成功')
    }
    handleCancel()
    props.update()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const openModal = (type: string, data?: IDept | { parentId: string }) => {
    setAction(type)
    setIsModalOpen(true)
    getDeptData()
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
        title={action === 'create' ? '新增部门' : '编辑部门'}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 4 }}>
          <Form.Item label="上级部门" name="parent">
            <TreeSelect
              placeholder="请选择上级部门"
              allowClear
              treeDefaultExpandAll
              treeData={depthList}
              fieldNames={{ label: 'deptName', value: 'id' }}
            />
          </Form.Item>
          <Form.Item
            label="部门名称"
            name="name"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder="请输入部门名称"></Input>
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

export default CreateDept
