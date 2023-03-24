import React, {useState} from 'react';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';

const AccordeonUseState = (props) =>{
    const [accordeon, setOpenedAccordeon] = useState(false);

    function toggleAccordeon (index) {
        if(index === accordeon){
            setOpenedAccordeon(false);
            return
        }
        setOpenedAccordeon(index);
    }    


    const arrToAccordeon = () => {
        return props.information.map((elem, index)=>{
            const accordeonStyle = accordeon === index ? styles.accordionOpened : styles.accordionClosed; 
            const accordeonArrow = accordeon === index ? styles.arrowDown : styles.arrowRight;         
            const accordeonAnswer = accordeon === index ? styles.answerOpened : styles.answerClosed;
            return (             
                <article 
                    key={index} 
                    onClick={()=> toggleAccordeon(index)} 
                    className={classNames(styles.faqElement, styles.wrapperFlexColumnStartCenter, styles.radius03Rem)}
                    style={{alignItems: 'stretch'}}
                >
                    <div className={classNames(accordeonStyle, styles.wrapperFlexRowSpaceBetween)}>
                        <p>{elem.question}</p>
                        <p className={accordeonArrow}><span className="fas fa-arrow-down small"/></p>
                    </div>     
                    <div className={accordeonAnswer}>{elem.answer}</div>
                </article> 
            );
        });
    }  

return (
        <>
            { arrToAccordeon() }        
        </>    
)

}
export default AccordeonUseState;

