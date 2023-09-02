import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { defaultTheme } from './styles/thames/default'
import isPropValid from '@emotion/is-prop-valid'
import { GlobalStyle } from './styles/global'
import Router from './Router'
import { CycleContextProvider } from './context/cycleContext/context'

export const App = () => {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeProvider theme={defaultTheme}>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </StyleSheetManager>
  )
}
