import AdivisorsSection from '../../components/AdvisorsSection';
import DiatomInfo from '../../components/DiatomInfo';
import InfoSections from '../../components/InfoSections';
import LandingHero from '../../components/LandingHero';
import Roadmap from '../../components/Roadmap';
import Tokenomics from '../../components/Tokenomics';

const DaoPage = () => (
  <div>
    <LandingHero />
    <DiatomInfo />
    <Tokenomics />
    <InfoSections />
    <AdivisorsSection />
    <Roadmap />
  </div>
  );

export default DaoPage;