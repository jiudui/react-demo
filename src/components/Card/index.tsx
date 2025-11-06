import React from "react"
import "./index.css"

interface Props {
    title?: string
    children?: React.ReactNode
}

export  const Card: React.FC<Props> = (props) => {
    return  <div className="card" key="index">
            <header>
                <div>{props.title}</div>
                <div>副标题</div>
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <button>确定</button>
                <button>取消</button>
            </footer>
        </div>
}