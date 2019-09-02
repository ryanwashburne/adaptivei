import React from 'react'

import { Layout, Box, Paper, Text, Button, Dialog, Snackbar, TextField } from '../../../components'

import { updateUser, deleteUser } from '../../../utils'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'

const displayKeys = {
  'full_name': 'Full Name',
  'password': 'Password',
}

export default (props) => {
  let keys = []
  let initialState = {}
  try {
    initialState = props.user.user_metadata
    initialState.password = ''
    keys = Object.keys(initialState)
  } catch(e) { }
  const [state, changeState] = React.useState(initialState)
  const [focused, changeFocus] = React.useState()
  const [success, changeSuccess] = React.useState()
  const [modal, changeModal] = React.useState(false)

  function handleChange(e) {
    changeState({ ...state, [e.target.name]: e.target.value })
  }

  function handleFocus(e) {
    changeFocus(e.target.name)
  }

  function handleClose() {
    changeSuccess(false)
  }

  function handleModalClose() {
    changeModal(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!focused) {
      return
    }
    try {
      const data = focused === 'password' ? { password: state.password } : { data: { [focused]: state[focused] } }
      await updateUser(data)
      changeSuccess(true)

    } catch(e) { }
  }

  return (
    <Layout title="Profile">
      <Box flexGrow={1} m={6}>
        <Box maxWidth={600} mx="auto">
          <Paper p={4} mb={1}>
            <Text align="center"><AccountCircleRoundedIcon color="secondary" style={{ fontSize: 40 }} /></Text>
            <Text variant="h5" align="center" paragraph>Profile Settings</Text>
            <Box mt={4} mb={1}>
              <TextField
                label="Email"
                value={(props && props.user && props.user.email) ? props.user.email : null}
                disabled
                style={{ width: '75%' }}
                required
              />
            </Box>
            {keys.map((key, i) => {
              return (
                <form key={i} onSubmit={handleSubmit}>
                  <Box display="flex" mb={1} alignItems="center">
                    <TextField
                      label={displayKeys[key]}
                      onFocus={handleFocus}
                      type={key === 'password' ? 'password' : null}
                      name={key}
                      value={state[key]}
                      onChange={handleChange}
                      required
                      style={{ width: '75%' }}
                    />
                    {focused === key && (
                      <Box ml={2}>
                        <Button fullWidth type="submit" variant="outlined">Submit</Button>
                      </Box>
                    )}
                  </Box>
                </form>
              )
            })}
          </Paper>
          <Button onClick={() => changeModal(true)}>Delete Account</Button>
        </Box>
      </Box>
      <Snackbar
        open={success}
        onClose={handleClose}
        variant="success"
        message="Form successfully submitted"
      />
      <Dialog title="Delete Account" open={modal} onClose={handleModalClose} actions={[
        <Button onClick={handleModalClose} key={0}>Cancel</Button>,
        <Button color="primary" variant="outlined" onClick={() => { handleModalClose(); deleteUser() }} key={1}>Delete</Button>
      ]}>
        <Text paragraph color="textSecondary">Are you sure you wish to delete your account?</Text>
      </Dialog>
    </Layout>
  )
}