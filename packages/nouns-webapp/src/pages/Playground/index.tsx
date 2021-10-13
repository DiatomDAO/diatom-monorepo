import { Container, Col, Button, Row, DropdownButton, Dropdown } from 'react-bootstrap';
import classes from './Playground.module.css';
import { useEthers } from '@usedapp/core';
import { useState } from 'react';
import { ethers } from 'ethers';
import config from '../../config';
import Noun from '../../components/Noun';
import { NounsDescriptorABI, NounsSeederABI } from '@nouns/contracts';

const Playground = () => {
  const [svgs, setSvgs] = useState<string[]>();

  const ethersUseDapp = useEthers();
  const descriptor = new ethers.Contract(
    config.nounsDescriptorAddress,
    NounsDescriptorABI,
    ethersUseDapp.library,
  );
  const seeder = new ethers.Contract(
    config.nounsSeederAddress,
    NounsSeederABI,
    ethersUseDapp.library,
  );

  const fetchSVG = async () => {
    for (let i = 0; i < 10; i++) {
      const seed = await seeder.generateSeed(
        Math.floor(Math.random() * 10000000000),
        config.nounsDescriptorAddress,
      );
      const svg = await descriptor.generateSVGImage(seed);
      setSvgs(prev => {
        return prev ? [svg, ...prev] : [svg];
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={10} className={classes.headerRow}>
          <span>Explore</span>
          <h1>Playground</h1>
          <p>
            The playground was built using the Nouns protocol. Each Noun's traits are generated
            using the NounsSeeder contract. Using the seed, the Noun is then rendered using the
            NounsDescriptor contract.
          </p>
        </Col>

        <Col lg={3}>
          <Button onClick={fetchSVG} className={classes.generateBtn}>
            GENERATE NOUNS
          </Button>
        </Col>
        <Col lg={9}>
          <Row>
            {svgs &&
              svgs.map(svg => {
                return (
                  <Col xs={4} lg={3}>
                    <Noun
                      imgPath={`data:image/svg+xml;base64,${svg}`}
                      alt="noun"
                      className={classes.nounImg}
                    />
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Playground;
