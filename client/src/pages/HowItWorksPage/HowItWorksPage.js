import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowWork from '../../components/HowItWorksComponents/HowWork';
import WaysToUse from '../../components/HowItWorksComponents/WaysToUse';



const HowItWorksPage = (props) => {

    return (
        <div>
          <Header />
          <HowWork />
          <WaysToUse />
          <Footer />
          
        </div>                    
    );
}

export default HowItWorksPage;