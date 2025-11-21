import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Components/AuthContext/AuthProvider.jsx'
import { ThemeProvider } from "./Components/ThemeContext/ThemeContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
