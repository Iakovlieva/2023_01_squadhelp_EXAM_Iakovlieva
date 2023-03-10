import React from 'react';
import { Field } from 'formik';
import { useField } from 'formik';

const FieldFileInput = (props) => {
  const [ field, meta, helpers] = useField(props.name);  
  const { value } = meta;
  const { setValue } = helpers;  


  const { classes, ...rest } = props;
  const {
    fileUploadContainer, labelClass, fileNameClass, fileInput,
  } = classes;


  const onChange = (e) => {       
    const file = e.target.files[0]; 
    setValue(file);
  };

  return (
    <Field name={rest.name}>
      {(props) => {

        const getFileName = () => {       
          if (props.field.value) {
            return props.field.value.name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor="fileInput" className={labelClass}>
              Choose file
            </label>
            <span id="fileNameContainer" className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              className={fileInput}
              id="fileInput"
              type="file"
              onChange={onChange}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
