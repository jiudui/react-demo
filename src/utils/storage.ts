export  default   {
    get: (key: string)=>{
        return localStorage.getItem(key)
    },
    set: (key: string, value: unknown)=>{
        return localStorage.setItem(key, JSON.stringify(value))
    },
    remove: (key: string) =>{
        return localStorage.removeItem(key)
    },
    clear: ()=>{
        return localStorage.clear()
    }
}