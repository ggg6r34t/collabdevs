import React from 'react'

import LogIn from '../../components/users/login/LogIn'
import GoogleLogIn from '../../components/users/login/GoogleLogin'

export default function SignIn() {
  return (
    <div><GoogleLogIn/>
      <LogIn/></div>
  )
}
