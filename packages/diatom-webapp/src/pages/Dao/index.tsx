import AdivisorsSection from '../../components/AdvisorsSection';
import DiatomInfo from '../../components/DiatomInfo';
import InfoSections from '../../components/InfoSections';
import LandingHero from '../../components/LandingHero';
import Tokenomics from '../../components/Tokenomics';

const DaoPage = () => (
  <div>
    <LandingHero />
    <DiatomInfo />
    <Tokenomics />
    <InfoSections />
    <AdivisorsSection />
  </div>
  );

export default DaoPage;