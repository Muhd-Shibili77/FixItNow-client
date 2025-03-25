import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
        <BrowserRouter>
        <GoogleOAuthProvider clientId={googleClientId}>
            <App />
         </GoogleOAuthProvider>

        </BrowserRouter>
    </StrictMode>
  </Provider>
  
)
