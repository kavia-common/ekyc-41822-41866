import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabase'
import { handleAuthError } from '../../utils/auth'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl()
      if (error) {
        handleAuthError(error, navigate)
        return
      }
      if (data?.session) {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }
    handleAuthCallback()
  }, [navigate])

  return <div>Processing authentication...</div>
}
