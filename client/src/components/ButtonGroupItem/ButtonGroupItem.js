import React from 'react';
import styles from "../ButtonGroupComponent/ButtonGroupComponent.module.sass";


const ButtonGroupItem = (props) => {

   const {id, active, buttonText, labelText, changeItem} = props;
   const activeButton = active? "2px solid #2cb9b7": null;
   const activeButtonElem = active? "#2cb9b7": null;   

    return (
        <div className={styles.buttonItem} style={{border: activeButton}} onClick={() => changeItem(id)} >
            <span className={styles.buttonItemButton} style={{backgroundColor: activeButtonElem}} >{buttonText}</span>
            <span className={styles.buttonItemText}>{labelText}</span>
        </div>        
    );
}

export default ButtonGroupItem;