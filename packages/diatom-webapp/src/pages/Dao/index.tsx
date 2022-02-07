import AdivisorsSection from '../../components/AdvisorsSection';
import DiatomInfo from '../../components/DiatomInfo';
import LandingHero from '../../components/LandingHero';
import Roadmap from '../../components/Roadmap';
import Tokenomics from '../../components/Tokenomics';

const DaoPage = () => (
  <div>
    <LandingHero />
    <DiatomInfo />
    <Tokenomics />
    <AdivisorsSection />
    <Roadmap />
  </div>
  );

export default DaoPage;