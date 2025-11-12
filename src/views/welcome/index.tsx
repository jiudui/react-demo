import { Button, message } from 'antd'
import storage from '../../utils/storage.ts'
import styles from './index.module.less'

export default function Welcome() {
  const handleStorage = (type: number) => {
    switch (type) {
      case 1:
        storage.set('name', '张三')
        storage.set('user', JSON.stringify({ name: '张三', age: 18 }))
        message.success('数据写入成功')
        break
      case 2:
        const name = storage.get('name')
        const user = storage.get('user')
        console.log('读取的数据:', { name, user })
        message.info(`读取数据: name=${name}, user=${user}`)
        break
      case 3:
        storage.remove('name')
        message.warning('name 数据已删除')
        break
      case 4:
        storage.clear()
        message.warning('所有数据已清空')
        break
      default:
    }
  }

  return (
    <div className={styles.welcome}>
      <h1 className={styles.title}>欢迎使用后台管理系统</h1>
      <p className={styles.subtitle}>
        这是一个基于 React 和 TypeScript 构建的现代化应用
      </p>

      <div className={styles.buttonGroup}>
        <Button type="primary" onClick={() => handleStorage(1)}>
          写入数据
        </Button>
        <Button onClick={() => handleStorage(2)}>读取数据</Button>
        <Button danger onClick={() => handleStorage(3)}>
          删除数据
        </Button>
        <Button onClick={() => handleStorage(4)}>清空数据</Button>
      </div>
    </div>
  )
}
