import React from 'react'
import { Helmet } from 'react-helmet'

import SEO from './seo'
import Header from './header'
import Footer from './footer'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../theme'

import './global.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { initAuth } from '../utils'
initAuth()

export default (props) => {

  // the key in the top level component is important because it forces react to re-evaluate the styles on the first render.
  // without this, there will be erroring renders on the first paint in some situations.
  const [isClient, setClient] = React.useState(false);
  React.useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div key={isClient}>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <SEO title={props.title} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <div style={{ height: 60 }} />
        <div style={{ minHeight: `calc(100vh - 60px)`, display: 'flex', flexDirection: 'column' }}>
          {props.children}
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  )
}