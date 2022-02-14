import AdivisorsSection from '../../components/AdvisorsSection';
import DiatomInfo from '../../components/DiatomInfo';
import LandingHero from '../../components/LandingHero';
import Roadmap from '../../components/Roadmap';
import Tokenomics from '../../components/Tokenomics';
import UpcomingPopup from '../../components/UpcomingPopup';

const DaoPage = () => (
  <div>
    <LandingHero />
    <DiatomInfo />
    <Tokenomics />
    <AdivisorsSection />
    <Roadmap />
    <UpcomingPopup />
  </div>
  );

export default DaoPage;