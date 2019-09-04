import React from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'

import Link from './link'
import Button from './button'
import Box from './box'

import { isLoggedIn, handleLogin, handleRegister, getUser, logout } from '../utils/auth'

import { AppBar, Toolbar } from '@material-ui/core'
import { Menu, MenuItem, Drawer, List, ListItem, ListSubheader, Divider, IconButton } from '@material-ui/core'
import { useScrollTrigger, Slide } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

function HideOnScroll(props) {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  )
}

function Account(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
  }
  return (
    <>
      <Box ml={2} display={{ xs: 'none', md: 'block' }} onClick={() => handleLogin(() => navigate('/dashboard/'))}>
        <Button>Deal Registration</Button>
      </Box>
      <Box flexGrow={1} />
      {props.user && (
        <>
        <Box ml={3} display={{ xs: 'none', md: 'block' }}>
          <Button aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick} style={{ display: 'flex', justifyContent: 'center' }}>
            {props.user.email} {Boolean(anchorEl) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </Box>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <MenuItem component={Link} to="/dashboard/profile/" onClick={handleClose}>Profile Settings</MenuItem>
          <MenuItem onClick={() => logout(() => navigate(`/`))}>Log Out</MenuItem>
        </Menu>
        </>
      )}
    </>
  )
}

export default (props) => {
  let user
  if (isLoggedIn()) {
    user = getUser()
  }
  function NavButton(props) {
    return (
      <Box ml={2} display={{ xs: 'none', md: 'block' }}>
        <Button component={Link} to={props.to}>{props.children}</Button>
      </Box>
    )
  }
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.jpg" }) {
        childImageSharp {
          fixed(height: 55) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, toggleDrawer] = React.useState(false)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <HideOnScroll>
      <AppBar style={{ backgroundColor: 'white', height: 60, justifyContent: 'center', zIndex: 5 }}>
        <Box clone display="flex" alignItems="center">
          <Toolbar>
            <Link to="/">
              <Img fixed={data.file.childImageSharp.fixed} alt="brand logo" style={{ verticalAlign: 'middle' }} />
            </Link>
            <Box ml={3} display={{ xs: 'none', md: 'block' }}>
              <Button aria-controls="solutions-menu" aria-haspopup="true" onClick={handleClick} style={{ display: 'flex', justifyContent: 'center' }}>
                Solutions {Boolean(anchorEl) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Button>
            </Box>
            <Menu
              id="solutions-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MenuItem component={Link} to="/solutions/information-security/" onClick={handleClose}>Information Security</MenuItem>
              <MenuItem component={Link} to="/solutions/optimized-networks/" onClick={handleClose}>Optimized Networks</MenuItem>
              <MenuItem component={Link} to="/solutions/application-delivery-infrastructure/" onClick={handleClose}>Application Delivery Infrastructure</MenuItem>
            </Menu>

            <NavButton to="/services/professional/">
              Professional Services
            </NavButton>
            <NavButton to="/partners/">
              Partners
            </NavButton>
            <NavButton to="/about/">
              About
            </NavButton>
            <NavButton to="/contact/">
              Contact
            </NavButton>

            <Account user={user} />
            
            <Box display={{ xs: 'block', md: 'none' }}>
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
              <Box width={300}>
                {user ? (
                  <List>
                    <ListSubheader style={{ textTransform: 'uppercase' }}>{user.email}</ListSubheader>
                    <ListItem button component={Link} to="/dashboard/profile/">Profile Settings</ListItem>
                    <ListItem button onClick={() => logout(() => navigate(`/`))}>Log Out</ListItem>
                  </List>
                ) : (
                  <List>
                    <ListSubheader>Account</ListSubheader>
                    <ListItem button onClick={() => { toggleDrawer(false); handleLogin(() => navigate('/dashboard/')) }}>Sign In</ListItem>
                    <ListItem button onClick={() => { toggleDrawer(false); handleRegister(() => navigate('/dashboard/')) }}>Register</ListItem>
                  </List>
                )}
                <Divider />
                <List>
                  <ListItem button onClick={() => { toggleDrawer(false); handleLogin(() => navigate('/dashboard/')) }}>Deal Registration</ListItem>
                </List>
                <Divider />
                <List>
                  <ListSubheader>Solutions</ListSubheader>
                  <ListItem button component={Link} to="/solutions/information-security/">Information Security</ListItem>
                  <ListItem button component={Link} to="/solutions/optimized-networks/">Optimized Networks</ListItem>
                  <ListItem button component={Link} to="/solutions/application-delivery-infrastructure/">Application Delivery Infrastructure</ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem button component={Link} to="/services/professional/">Professional Services</ListItem>
                  <ListItem button component={Link} to="/partners/">Partners</ListItem>
                  <ListItem button component={Link} to="/about/">About</ListItem>
                  <ListItem button component={Link} to="/contact/">Contact</ListItem>
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </Box>
      </AppBar>
    </HideOnScroll>
  )
}