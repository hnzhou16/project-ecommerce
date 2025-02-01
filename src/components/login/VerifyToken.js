import {authAPI} from "../consts";

export const VerifyToken = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found in local storage.')
    return false
  }

  try {
    const response = await fetch(`${authAPI}/verifyToken`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.ok
  } catch (err) {
    console.error('Error verifying token', err)
    return false
  }
}