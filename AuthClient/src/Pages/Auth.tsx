import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Update URL based on current state
    if (isLogin && location.pathname === '/register') {
      navigate('/login', { replace: true })
    } else if (!isLogin && location.pathname === '/login') {
      navigate('/register', { replace: true })
    }
  }, [isLogin, location.pathname, navigate])

  return isLogin ? (
    <LoginForm onSwitch={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onSwitch={() => setIsLogin(true)} />
  )
}

export default Auth