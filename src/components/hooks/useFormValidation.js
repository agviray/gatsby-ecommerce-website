import React, { useState, useEffect } from "react"

const useFormValidation = () => {
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  const updateFormValues = e => {
    let name = e.target.name
    let value = e.target.value

    // Use some sort of validate function to check values here.

    setFormValues({ ...formValues, [name]: value })
  }

  return { formValues, updateFormValues }
}

export default useFormValidation
