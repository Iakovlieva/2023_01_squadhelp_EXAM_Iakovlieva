import React from 'react';
import classNames from 'classnames';
import CONSTANTS from '../../../constants';
import { isString, useField } from 'formik';

const ImageUpload = (props) => {
  const [field, meta, helpers] = useField(props.name);  
  const { value } = meta;
  const { setValue } = helpers;  

  const { uploadContainer, inputContainer, imgStyle } = props.classes;

  const onChange = (e) => {
      const node = window.document.getElementById('imagePreview');
      const file = e.target.files[0];
      const imageType = /image.*/;
      if (!file.type.match(imageType)) {
        e.target.value = '';
      } else {

        const reader = new FileReader();        
        reader.onload = () => {
          node.src = reader.result;
        };
        reader.readAsDataURL(file);

        setValue(file);
      }   
    };

    
    let srcImagePreview=null;
    if ((props.name === 'avatar') && isString(field.value)) {
          srcImagePreview = (field.value === 'anon.png') ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${field.value}`;
    }  

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <img id="imagePreview" src={srcImagePreview} className={classNames({ [imgStyle]: !!field.value })} alt="user" />
    </div>
  );
};

export default ImageUpload;
