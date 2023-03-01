import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowWork from '../../components/HowItWorksComponents/HowWork';
import WaysToUse from '../../components/HowItWorksComponents/WaysToUse';
import HowNaming from '../../components/HowItWorksComponents/HowNaming';



const HowItWorksPage = (props) => {

    return (
        <div>
          <Header />
          <HowWork />
          <WaysToUse />
          <HowNaming />
          <Footer />
          
        </div>                    
    );
}

export default HowItWorksPage;