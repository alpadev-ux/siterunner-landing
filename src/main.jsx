import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SiteThemeProvider } from './SiteThemeContext.jsx'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('SiteUpscale: #root element missing from index.html')
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SiteThemeProvider>
        <App />
      </SiteThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
