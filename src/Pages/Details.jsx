import React from 'react'
import { EmployeeDetail } from "../Components/EmployeeDetail";
import { useLocation } from 'react-router-dom';

export const Details = () => {
  const employee = useLocation().state;
  return (
    <>
      <EmployeeDetail data = {employee}/>
    </>
  )
}
