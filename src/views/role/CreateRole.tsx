import { Modal, Form, Input, message } from 'antd'
import { useImperativeHandle, useState, forwardRef } from 'react'
import type { IRole } from '../../types/api'
import api from '../../api/roleApi'

interface IProps {
  update: () => void
}

export interface CreateRoleRef {
  openModal: (type: string, data?: IRole | { parentId: string }) => void
}

const CreateRoleRef = forwardRef<CreateRoleRef, IProps>((props, ref) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [action, setAction] = useState<string>('create')
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (!valid) return
    if (action === 'create') {
      await api.createRole(form.getFieldsValue())
      message.success('创建成功')
    } else if (action === 'edit') {
      await api.updateRole(form.getFieldsValue())
      message.success('编辑成功')
    }
    handleCancel()
    props.update()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const openModal = (type: string, data?: IRole | { parentId: string }) => {
    setAction(type)
    setIsModalOpen(true)
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
        title={action === 'create' ? '新增角色' : '编辑角色'}
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
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称"></Input>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea placeholder="请输入备注"></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default CreateRoleRef
