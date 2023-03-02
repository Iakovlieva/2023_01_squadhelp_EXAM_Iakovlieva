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

    const arrToAnswer = (answer) => {
        if ( Array.isArray(answer) ){ 
        return answer.map((elem, index)=>{
            if ( Array.isArray(elem) ) {
                return elem.map((lipart, index)=>{
                   return (
                        <li key={index}>{arrToAnswer(lipart)}</li>
                    )
                });
            } else if (typeof elem === 'string') {
                return elem;
            } else {
                return (
                    <a href={elem.link} key={index}>{elem.text}</a>
                )
            }
        });
        } else if (typeof answer === 'string') {
            return answer;
        } else {
            return (<a href={answer.link}>{answer.text}</a>); 
        }
    }  

    const arrToAccordeon = () => {
        return props.information.map((elem, index)=>{
             return (  
                    <details className={classNames(styles.faqElement, styles.wrapperFlexColumnStartCenter, styles.radius03Rem)} key={index}>
                    <summary className={styles.faqQuestion}>{elem.question}</summary>
                        <p className={styles.faqAnswer}>{arrToAnswer(elem.answer)}</p>
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