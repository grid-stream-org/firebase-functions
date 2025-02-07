const { onCall } = require('firebase-functions/v2/https')
const { initializeApp } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')

initializeApp()

exports.getUserEmailById = onCall(async request => {
  if (!request.auth) {
    throw new Error('Unauthorized')
  }

  const userId = request.data.userId

  if (!userId) {
    throw new Error('User ID is required')
  }

  try {
    const userRecord = await getAuth().getUser(userId)
    return { email: userRecord.email }
  } catch (error) {
    throw new Error(`Error retrieving user email: ${error.message}`)
  }
})
