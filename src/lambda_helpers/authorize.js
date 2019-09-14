export default (user, callback) => {
  if (!user || !user.app_metadata || !user.app_metadata.roles || user.app_metadata.roles[0] !== 'admin') {
    return {
      statusCode: 400,
      body: 'Unauthorized'
    }
  }
  return callback(user)
}