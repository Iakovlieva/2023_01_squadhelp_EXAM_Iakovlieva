import React, { useEffect } from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

const ContestsContainer = (props) => {
  useEffect(() => { 
    window.addEventListener('scroll', scrollHandler);
    
    return () => {     
      window.removeEventListener('scroll', scrollHandler);
    }
  },[props]);

  const scrollHandler = () => {     
    if ( Math.ceil(window.innerHeight + document.documentElement.scrollTop) === Math.ceil(document.documentElement.offsetHeight) ) {
      if (props.haveMore) {
        props.loadMore(props.children.length);
      }
    }
  };

  const { isFetching } = props;     
  if (!isFetching && props.children.length === 0) {
    return <div className={styles.notFound}>Nothing not found</div>;
  } return (
    <div style={{width: '90%'}}>
      {props.children}
      {isFetching && <div className={styles.spinnerContainer}><Spinner /></div>}
    </div>
  );
}

export default ContestsContainer;
