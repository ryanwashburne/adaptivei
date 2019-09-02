import React from 'react'

import Text from './text'
import Grid from './grid'
import Box from './box'
import Button from './button'
import Link from './link'
import Snackbar from './snackbar'
import TextField from './textfield'

import { withStyles } from '@material-ui/styles';

import { NetlifyForm } from '../utils'

const styles = {
  gradient: {
    background: 'linear-gradient(to left, #232526, #414345)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
}

const CssTextField = withStyles(theme => ({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& label': {
      color: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
}))(TextField);

export default withStyles(styles)((props) => {
  const [state, changeState] = React.useState({})
  const [success, changeSuccess] = React.useState(null)

  function handleChange(e) {
    changeState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    changeSuccess(true)
  }

  function handleClose() {
    changeSuccess(false)
  }

  return (
    <Box px={4} py={6} className={props.classes.gradient} color="white">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box textAlign={{ xs: 'center', md: 'left' }} mb={{ xs: 4, md: 0 }}>
            <Text variant="h5">Get Our News</Text>
            <Text variant="subtitle2">Enter your email to sign up for our mailing list.</Text>
            <NetlifyForm name="contact" action="/" fields={state} onSubmit={handleSubmit}>
              <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'start' }}>
                <CssTextField
                  name="email"
                  label="Email Address"
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={handleChange}
                  type="email"
                />
                <Box ml={2}>
                  <Button color="primary" variant="contained" type="submit">Submit</Button>
                </Box>
              </Box>
            </NetlifyForm>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box textAlign={{ xs: 'center', md: 'right' }} display="flex" flexDirection="column" justifyContent="center" height="100%">
            <Text><Link to="/">Adaptive Integration</Link></Text>
            <Text color="secondary" variant="subtitle2">Copyright &copy; {new Date().getFullYear()}</Text>
            <Box display="flex" alignSelf={{ xs: 'center', md: 'flex-end' }} justifyContent="space-between" color="white" fontSize={20} width={100} mt={1}>
              <Link href="https://www.instagram.com/adaptive_i/">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="https://twitter.com/Adaptive_i">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="https://www.linkedin.com/company/adaptive-integration-inc">
                <i className="fab fa-linkedin"></i>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={success}
        onClose={handleClose}
        variant="success"
        message="Form successfully submitted"
      />
    </Box>
  )
})