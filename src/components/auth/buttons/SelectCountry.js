import React, { useState, useEffect, memo } from 'react'
import { COUNTRY_CODE_DUMMY } from '../../../context/constants'
import styles from './SelectCountry.module.scss'

const SelectCountry = memo(({ onChange }) => {
  const [countryCode, setCountryCode] = useState([])

  useEffect(() => {
    setCountryCode(COUNTRY_CODE_DUMMY)
  }, [])

  return (
    <select className={styles.selectCountry} onChange={onChange}>
      <option value="84" hidden>
        VN (+84)
      </option>
      {Object.entries(countryCode).map(([key, value]) => (
        <option key={key} value={`${key} ${value.dialling_code}`}>
          {value.country_name} {value.dialling_code}
        </option>
      ))}
    </select>
  )
})
export default SelectCountry
