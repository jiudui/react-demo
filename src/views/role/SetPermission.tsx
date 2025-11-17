import {
  Modal,
  Form,
  message,
  Tree,
  type TreeProps,
  type TreeDataNode,
} from 'antd'
import { useImperativeHandle, useState, forwardRef, useEffect } from 'react'
import type { IMenu, IPremission, IRole } from '../../types/api'
import api from '../../api'
import roleApi from '../../api/roleApi'

interface IProps {
  update: () => void
}

export interface SetPermissionRef {
  openModal: (type: string, data?: IRole) => void
}

const SetPermissionRef = forwardRef<SetPermissionRef, IProps>((props, ref) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [permission, setPermission] = useState<IPremission>()

  const [menuList, setMenuList] = useState<IMenu[]>([])

  const [roleInfo, setRoleInfo] = useState<IRole>()

  useEffect(() => {
    getMenuList()
  }, [])
  const getMenuList = async () => {
    const data = await api.getMenuList()
    setMenuList(data)
  }
  const onCheck: TreeProps['onCheck'] = (checkedKeys: any, info: any) => {
    setCheckedKeys(checkedKeys)
    const checkedKeysTemp: string[] = []
    const halfCheckedKeysTemp: string[] = []

    info.checkedNodes.map((node: IMenu) => {
      if (node.menuType === 2) {
        checkedKeysTemp.push(node.id)
      } else if (node.menuType === 1) {
        halfCheckedKeysTemp.push(node.id)
      }

      setPermission({
        id: roleInfo?.id || '',
        permissionList: {
          checkedKeys: checkedKeysTemp,
          halfCheckedKeys: halfCheckedKeysTemp.concat(info.halfCheckedKeys),
        },
      })
    })
  }
  const handleOk = async () => {
    if (permission) {
      await roleApi.updatePremisssion(permission)
      message.success('设置权限成功')
    }

    // const valid = await form.validateFields()
    // if (!valid) return
    // if (action === 'create') {
    //   await api.createRole(form.getFieldsValue())
    //   message.success('创建成功')
    // } else if (action === 'edit') {
    //   await api.updateRole(form.getFieldsValue())
    //   message.success('编辑成功')
    // }
    handleCancel()
    props.update()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const openModal = (type: string, data?: IRole) => {
    setRoleInfo(data)
    setIsModalOpen(true)
    setCheckedKeys(data?.permissionList?.checkedKeys || [])
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
        title={'设置权限'}
        closable={{ 'aria-label': 'Custom Close Button' }}
        width={600}
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
          <Form.Item label="角色名称"></Form.Item>
          <Form.Item label="权限">
            <Tree
              checkable
              onCheck={onCheck}
              defaultExpandAll
              defaultCheckedKeys={checkedKeys}
              treeData={menuList as unknown as TreeDataNode[]}
              fieldNames={{
                children: 'children',
                title: 'menuName',
                key: 'id',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default SetPermissionRef
