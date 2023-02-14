import React from 'react';
import styles from "../ContestForm/ContestForm.module.sass";


const ButtonGroupItem = (props) => {

    const {id, active, buttonText, labelText, changeItem} = props;
   const activeButton = active? "red": "#eee";
  console.log(props,"====",activeButton);
    return (
        <div className={styles.eventListItem} style={{backgroundColor: activeButton}} onClick={() => changeItem(id)} >
            <span>{buttonText}</span>
            <span>{labelText}</span>
        </div>        
    );
}

export default ButtonGroupItem;