import ReactDom from "react-dom/client"
const Message = ()=>{
    return [
        <div key="index" style={{ width: "200px", height: "50px", margin: "auto" }}>
            消息提示
        </div>
    ]
}

interface Item {
    root: ReactDom.Root
    messageContent: HTMLElement
}
const list:Item[] = []

window.onShow = ()=>{
     const messageContent = document.createElement('div')
     messageContent.className = 'message'
     messageContent.style.top = `${list.length * 40}px`
     document.body.appendChild(messageContent)

     const root = ReactDom.createRoot(messageContent)

     root.render(<Message />)

     list.push({
        root,
        messageContent
     })

     setTimeout(()=>{
        const item = list.find(item=>item.messageContent === messageContent)
        item?.root.unmount()
        document.body.removeChild(messageContent)
        list.splice(list.indexOf(item as Item),1)
     },2000)
}

//声明扩充
declare global {
    interface Window {
        onShow: ()=>void 
    }
}

export default Message