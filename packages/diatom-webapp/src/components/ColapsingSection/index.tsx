import { useState } from 'react';

import classes from './ColapsingSection.module.css';

const ColapsingSection = () => {
  const [openSection, setOpenSection] = useState('');

  const handleOpenSection = (section: string) => {
    if (section === openSection) {
      setOpenSection('');
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div className={classes.colapsingSectionContainer}>
      <div
        className={`${classes.section} ${openSection === 'dao' ? classes.openSection : ''}`}
        onClick={() => handleOpenSection('dao')}
      >
        <h2>Diatom DAO</h2>
        <div className={classes.contentContainer}>
          <p>
            Holders of the governance token, DIAT, will be able to suggest and vote on Diatom DAO
            proposals in a community-driven governance model.
          </p>
          <p>
            Initially Diatom will build a treasury using ETH and stablecoin bonds while we aggregate
            Plastic Reduction Credits (PRC), explore other investments with all DAO members.
          </p>
        </div>
      </div>
      <div
        className={`${classes.section} ${openSection === 'diat' ? classes.openSection : ''}`}
        onClick={() => handleOpenSection('diat')}
      >
        <h2>DIAT Reward</h2>
        <div className={classes.contentContainer}>
          <p>
            The winners of each auction receive both the NFT, and an amount of our DAO token, $DIAT,
            commensurate with their bid amount. This is priced at $25, the same price as our
            whitelist token sale, and the lowest at which it will ever be sold.
          </p>
          <p>
            There is also bonus multiplier of up to 2X for the first 9 Whalez. Whalez #1 gives you a
            2X multiplier, then it drops over time until Whalez #10 and beyond are 1X.
          </p>
          <p>
            So, if you win Whalez #1 for $250k, you would receive $500k in DIAT at $25/token, which
            equals 20,000 DIAT.
          </p>
          <p>
            The DIAT will be released on a 24 month linear vesting period. This is designed to give
            whales the opportunity to invest an uncapped amount at our whitelist token price, while
            removing the ability to dump. The tokens will be automatically staked when they vest.
          </p>
        </div>
      </div>
      <div
        className={`${classes.section} ${openSection === 'auction' ? classes.openSection : ''}`}
        onClick={() => handleOpenSection('auction')}
      >
        <h2>Auctions</h2>
        <div className={classes.contentContainer}>
          <p>
            The Diatom Auction Contract will auction one Whalez NFT over linearly decaying auction
            slots over the period of 2 weeks, beginning with 14 hours and diminishing until all 50
            are won. The auctions will end on or around December 14th (not considering time spent
            waiting for a settler or the accumulation of 5 minute timer resets if bids are placed in
            the last 5 minutes of an auction) . 100% of auction proceeds (ETH) are automatically
            deposited in the DiatomDAO treasury, where 65% will be used to fund plastic removal
            projects and mint the first PRCs. The remaining 35% will remain in the treasury for the
            DAO to decide how to allocate.
          </p>
          <p>
            Each time an auction is settled, the settlement transaction will also cause a new Whalez
            to be minted and a new auction to begin.
          </p>
        </div>
      </div>
      <div
        className={`${classes.section} ${openSection === 'whalez' ? classes.openSection : ''}`}
        onClick={() => handleOpenSection('whalez')}
      >
        <h2>Whalez Traits</h2>
        <div className={classes.contentContainer}>
          <p>
            Whalez are the expression of the critical role that whales play in the global ecosystem
            (see our{' '}
            <a
              href="https://medium.com/@diatomdao/introducing-diatom-dao-c9f7dd17b34c"
              target="_blank"
              rel="noreferrer"
            >
              Medium article
            </a>{' '}
            for more), and are an invitation for crypto Whales to prove crypto's true capacity for
            social impact (Whalez4Whales).
          </p>
          <p style={{ marginBottom: '6px' }}>Whalez NFT's have several unique characteristics:</p>
          <div className={classes.list}>
            <p>- Unique name</p>
            <p>- Unique phrase</p>
            <p>- Unique skin pattern</p>
            <p>- Blowhole expressions (9 forms, varying colors)</p>
            <p>- Eye expressions (10 forms, varying colors)</p>
            <p>- Backgrounds (4 forms, varying colors)</p>
          </div>
          <p>The name and phrase is connected to the Whalez personality and unique lore.</p>
        </div>
      </div>
    </div>
  );
};

export default ColapsingSection;
