import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
        <BrowserRouter>
        <GoogleOAuthProvider clientId="267542432299-qdk0ivpmgnr2docdm93smmcsrub5q5r9.apps.googleusercontent.com">
            <App />
         </GoogleOAuthProvider>

        </BrowserRouter>
    </StrictMode>
  </Provider>
  
)
