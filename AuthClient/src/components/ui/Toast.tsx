import Toastify from 'toastify-js'

interface ToastProps {
  text: string
}

const Toast = ({ text }: ToastProps) => {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      color: "#000000",
      background: "#ffffff",
      borderRadius: "8px",
    }
  }).showToast()
}

export default Toast
