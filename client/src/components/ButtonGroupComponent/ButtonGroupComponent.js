import React, {useState} from 'react';
import ButtonGroupItem from '../ButtonGroupItem/ButtonGroupItem';
import styles from "../ButtonGroupComponent/ButtonGroupComponent.module.sass";


const ButtonGroupComponent = (props) => {
    const [activeButton, setactiveButton] = useState(0);

    const buttonTexts = [['Yes','The Domain should exactly match the name'],
                         ['Yes', 'But minor variations are allowed (Recommended)'],
                         ['No', 'I am only looking for a name, not a Domain']
                        ];

    const buttonToItems = () => {
       return buttonTexts.map((elem, i)=> 
            <ButtonGroupItem 
                    key={i} id={i} changeItem={setactiveButton}
                    active={activeButton === i} buttonText={elem[0]} labelText={elem[1]}
            />
            )
    }


    return (
        <div className={styles.buttonGroupContainer} >
            {buttonToItems()}
        
        </div>        
    );
}

export default ButtonGroupComponent;