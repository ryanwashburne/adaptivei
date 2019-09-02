import { indigo, orange } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

import Goodtimes from './fonts/goodtimesrg.ttf'
const goodtimes = {
  fontFamily: 'Goodtimes',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${Goodtimes}) format('opentype')
  `,
}

let theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  },
  typography: {
    fontFamily: [
      'Heebo',
      'Arial',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [goodtimes],
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme