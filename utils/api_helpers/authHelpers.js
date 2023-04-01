const jwt = require('jsonwebtoken')

const verifyToken = (requestData) => {
  let token = requestData.token.access_token
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

export default verifyToken