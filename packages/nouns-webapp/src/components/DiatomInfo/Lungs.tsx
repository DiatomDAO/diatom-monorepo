import diatom from './assets/diatom.png';
import classes from './Lungs.module.css';
import backedImg from './assets/backed.svg';
import communityImg from './assets/community.svg';
import protocolImg from './assets/protocol.png';

// import rightArrow from './assets/rightArrow.svg';

const Lungs = () => (
  <>
    <div className={classes.LungsContainer}>
      <div className={classes.LungsContentWrapper}>
        <img className={classes.diatomImg} src={diatom} alt="Diatom" />
        <div className={classes.LungsContent}>
          <h2>Meet the real lungs of the planet</h2>
          <p>
            Diatoms are algae in oceans, lakes and waterways that are responsible for sequestering
            carbon and provide 50% of all the air that we breathe on earth.
          </p>
          <a href="#diatom" target="_blank">
            Learn more
            {/* <img src={rightArrow} alt="Arrow" /> */}
          </a>
        </div>
      </div>
    </div>
    <div className={classes.topics}>
      <div className={classes.topic}>
        <img src={backedImg} alt="Asset-backed icon" />
        <h5>Asset-backed</h5>
        <p>
          Each DIAT is backed by a minimum of 1 DAI. This means no matter what happens, you will
          always be able to sell your DIAT for at least 1 DAI. As our treasury grows, this number
          will also increase.
        </p>
      </div>
      <div className={classes.topic}>
        <img src={protocolImg} alt="Protocol Controlled icon" />
        <h5>Protocol Controlled</h5>
        <p>
          Unlike most other protocols, Diatom will own the majority of its LP’s by selling bonds of
          discounted DIAT in exchange for LP tokens. This prevents reliance on mercenary liquidity
          providers, and allows the treasury to be continually bolstered by LP fees.
        </p>
      </div>
      <div className={classes.topic}>
        <img src={communityImg} alt="Community Governed icon" />
        <h5>Community Governed</h5>
        <p>
          As a DAO, Diatom is owned and directed pro-rata by DIAT holders. Any action or change to
          the DAO is discussed and voted upon by token holders. This ensures the DAO’s actions
          benefit all, and not just one small party.
        </p>
      </div>
    </div>
  </>
);

export default Lungs;
