import styles from './index.module.less'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <a href="https://github.com/yangxiaoge/react-admin-template">Github</a>
      </div>
      <div>版权归我所有</div>
    </footer>
  )
}
export default Footer
