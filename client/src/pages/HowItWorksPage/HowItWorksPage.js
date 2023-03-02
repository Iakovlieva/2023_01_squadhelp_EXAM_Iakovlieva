import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowWork from '../../components/HowItWorksComponents/HowWork';
import WaysToUse from '../../components/HowItWorksComponents/WaysToUse';
import HowNaming from '../../components/HowItWorksComponents/HowNaming';
import LauncingContest from '../../components/HowItWorksComponents/LauncingContest';
import ReadyToStart from '../../components/HowItWorksComponents/ReadyToStart';
import StarsSection from '../../components/HowItWorksComponents/StarsSection';
import HaveQuestions from '../../components/HowItWorksComponents/HaveQuestions';
import FeaturedIn from '../../components/HowItWorksComponents/FeaturedIn';


const HowItWorksPage = (props) => {

    return (
        <div>
          <Header />
          <HowWork />
          <WaysToUse />
          <HowNaming />
          <LauncingContest />
          <ReadyToStart />
          <StarsSection />
          <HaveQuestions />
          <FeaturedIn />
          <Footer />
          
        </div>                    
    );
}

export default HowItWorksPage;