import React from 'react'
import ForgotPassword from '../../components/ForgotPassword'
import { useNavigate } from 'react-router-dom'

function UpdatePassword() {
  const navigateTO = useNavigate();

  const handleNavigateTo = (e)=>{
    e && e.preventDefault();
    navigateTO(-1)
  }
  return (
    <section className='Dashboard__section DashboardSection__forgotPassword'>
    <ForgotPassword CBFun={handleNavigateTo} formTitle="Update your password"/>
    </section>
  )
}

export default UpdatePassword
