import netlifyIdentity from 'netlify-identity-widget'

import GoTrue from 'gotrue-js'
const auth = new GoTrue({
  APIUrl: 'https://adaptivei-v4.netlify.com/.netlify/identity',
  audience: '',
  setCookie: false
})



export const isBrowser = () => typeof window !== 'undefined'
export const initAuth = () => {
  if (isBrowser()) {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init()
  }
}
export const getUser = () => {
  if (isBrowser() && window.localStorage.getItem('netlifyUser')) {
    const user = JSON.parse(window.localStorage.getItem('netlifyUser'))
    if (!user.email) {
      const newUser = netlifyIdentity.currentUser()
      setUser(newUser)
      return newUser
    }
    return user
  }
  return null
}
const setUser = user =>
  window.localStorage.setItem('netlifyUser', JSON.stringify(user))
export const handleLogin = callback => {
  if (isLoggedIn()) {
    callback(getUser())
  } else {
    netlifyIdentity.open()
    netlifyIdentity.on('login', user => {
      setUser(user)
      callback(user)
    })
  }
}
export const handleRegister = callback => {
  if (isLoggedIn()) {
    callback(getUser())
  } else {
    netlifyIdentity.open('signup')
  }
}
export const isLoggedIn = () => {
  if (!isBrowser()) return false
  const user = netlifyIdentity.currentUser()
  setUser(user)
  return !!user
}
export const logout = callback => {
  netlifyIdentity.logout()
  netlifyIdentity.on('logout', () => {
    window.localStorage.removeItem('netlifyUser')
    callback()
  })
}



export const updateUser = async attributes => {
  try {
    const user = await auth.currentUser()
    const response = await user.update(attributes)
    setUser(response)
  } catch(e) {
    throw e
  }
}
export const deleteUser = async () => {
  try {
    const user = getUser()
    await fetch('/.netlify/functions/delete-user', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token.access_token,
      },
    })
    netlifyIdentity.logout()
    window.localStorage.removeItem('netlifyUser')
    window.location.reload()
  } catch(e) {
    throw e
  }
}