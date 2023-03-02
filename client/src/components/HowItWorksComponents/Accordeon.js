import React, {useEffect} from 'react';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';

const Accordeon = (props) =>{
    useEffect(()=>{
        var details = document.querySelectorAll("details");
        for(let i = 0; i < details.length; i++) {   
            details[i].addEventListener("toggle", accordion);
        }

        return () => {   
            for(let i = 0; i < details.length; i++) {   
                details[i].removeEventListener("toggle", accordion);
            }
          }
    }, []);
    function accordion(event) {
      if (!event.target.open) return;
        var details = event.target.parentNode.children;
        for( let i = 0; i < details.length; i++ ) {
          if (details[i].tagName != "DETAILS" || !details[i].hasAttribute('open') || event.target == details[i]) {
             continue;
          }
          details[i].removeAttribute("open");
        }
    }

    const arrToAccordeon = () => {
        return props.information.map((elem, index)=>{
             return (  
                    <details className={classNames(styles.faqElement, styles.wrapperFlexColumnStartCenter, styles.radius03Rem)} key={index}>
                    <summary className={styles.faqQuestion}>{elem.question}</summary>
                        <p className={styles.faqAnswer}>{elem.answer}</p>
                    </details>
            );
        });
        
    }  

return (
        <>
            { arrToAccordeon() }        
        </>    
)

}

 

export default Accordeon;