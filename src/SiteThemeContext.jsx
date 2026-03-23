import { createContext, useContext } from 'react'

const SiteThemeContext = createContext({ theme: 'medspa', setTheme: () => {} })

export function SiteThemeProvider({ children }) {
  return (
    <SiteThemeContext.Provider value={{ theme: 'medspa', setTheme: () => {} }}>
      {children}
    </SiteThemeContext.Provider>
  )
}

export function useSiteTheme() {
  return useContext(SiteThemeContext)
}
