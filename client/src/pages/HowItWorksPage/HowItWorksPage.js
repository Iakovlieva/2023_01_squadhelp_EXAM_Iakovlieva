import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowWork from '../../components/HowItWorksComponents/HowWork';
import WaysToUse from '../../components/HowItWorksComponents/WaysToUse';
import HowNaming from '../../components/HowItWorksComponents/HowNaming';
import LauncingContest from '../../components/HowItWorksComponents/LauncingContest';
import classNames from 'classnames';


const HowItWorksPage = (props) => {

    return (
        <div>
          <Header />
          <HowWork />
          <WaysToUse />
          <HowNaming />
          <LauncingContest />
          <Footer />
          
        </div>                    
    );
}

export default HowItWorksPage;