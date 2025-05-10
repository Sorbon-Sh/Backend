import { useState } from "react"
import Login from "../Login"
import Register from "../Register"


const AuthPage = () => {
    const [isAccount, setIsAccount] = useState<boolean>(false)




    return(
        <>
       {isAccount ? <Register />: <Login />}
       <div className=" flex gap-x-3 justify-center">
        <span>{isAccount ? "Есть аккаунт?": "Нет аккаунта?"}</span>
        <span className="cursor-pointer" onClick={() => setIsAccount(prev => !prev)}>{isAccount ? "Авторизация":"Регистрация"}</span>
       </div>
        </>
    )
}

export default AuthPage