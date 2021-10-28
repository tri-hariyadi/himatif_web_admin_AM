import React from 'react';
import Select from "react-select";
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { compare } from '../../../configs';

const SelectField = React.memo(({
  id,
  name,
  placeholder,
  label,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  eventChange,
  isLoading,
  menuPortalTarget,
  options,
  disabled,
  isSearchable,
  noOptionsMessage,
  hideLabel
}) => {
  return (
    <FormGroup>
      <Label style={hideLabel ? { visibility: 'hidden' } : {}} for={id} className='text-filed-label'>{label}</Label>
      <Select
        name={name}
        inputId={id}
        loadingMessage={() => <div><span>Loading...</span><i className="fa fa-spinner fa-pulse ml-2" /></div>}
        isLoading={isLoading}
        valid={!errors[name] && values[name] ? true : false}
        invalid={touched[name] && !!errors[name] ? true : false}
        onChange={(e) => {
          handleChange(name)(e)
          if (eventChange) eventChange(e)
        }}
        onBlur={handleBlur}
        blurInputOnSelect
        menuPortalTarget={menuPortalTarget}
        options={options ? options : []}
        isDisabled={disabled}
        placeholder={placeholder}
        className={`select-field w-100 ${errors[name] && touched[name] ? 'is-invalid' : values[name] ? 'is-valid' : ''}`}
        isSearchable={isSearchable}
        noOptionsMessage={() => noOptionsMessage || 'Data Tidak Ditemukan'}
      />
      {errors[name] && touched[name] && <FormFeedback className='d-block'>{errors[name]}</FormFeedback>}
    </FormGroup>
  )
}, compare);

export default SelectField;
