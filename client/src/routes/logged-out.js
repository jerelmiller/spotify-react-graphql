import React from 'react'
import { Navigate } from 'react-router-dom'

const LoggedOut = () => <Navigate to="/login" replace />

export default LoggedOut
