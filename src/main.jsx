import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
// import { ChatProvider } from './context/ChatContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <SocketProvider>
        <App />
        </SocketProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
