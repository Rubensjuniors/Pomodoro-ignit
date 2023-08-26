import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/thames/default'
import { GlobalStyle } from './styles/global'
import Router from './Router'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router />
      <GlobalStyle />
    </ThemeProvider>
  )
}
