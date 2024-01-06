import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ element: ProtectedPage, loggedIn, ...props }) {
  return (
    loggedIn ? 
    <ProtectedPage {...props} /> 
    : <Navigate to={'/'} replace />
  )
}