import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return isLogin ? (
    <LoginForm onSwitch={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onSwitch={() => setIsLogin(true)} />
  )
}

export default Auth