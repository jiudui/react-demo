import { Button } from "antd";
import storage  from '../../utils/storage.ts'

export default function Welcome() {
    const handleStorage = (type: number)=>{
        switch (type) {
            case 1:
                storage.set('name', '张三');
                storage.set('user', JSON.stringify({name: '张三', age:18}));
                break;
            case 2:
                console.log(storage.get('name'))
                break;
            case 3:
                storage.remove('name');
                break
            case 4:
                storage.clear();
                break;
            default:    
        }
    };

    return (
        <div>
            <h1>
                Welcome to React Router
            </h1>
            <Button onClick={()=> handleStorage(1)}></Button>
            <Button onClick={()=> handleStorage(2)}></Button>
            <Button onClick={()=> handleStorage(3)}></Button>
            <Button onClick={()=> handleStorage(4)}></Button>
        </div>
    )
}