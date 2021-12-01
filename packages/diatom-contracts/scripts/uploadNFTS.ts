import { NFTStorage, File } from 'nft.storage';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import csv from 'csv-parser';
import { createReadStream } from 'fs';

const ignoredFiles = ['.DS_Store'];

type row = {
  whale: string;
  name: string;
  description: string;
  'trait 1 (eyes)': string;
  'trait 2 (Blowhole)': string;
  'trait 3 (background)': string;
};

type Attribute = {
  trait_type: string;
  value: string;
};

type erc721Metadata = {
  name: string;
  description: string;
  image?: string;
  attributes: Attribute[];
};

const client = new NFTStorage({ token: process.env.APIKEY! });

const uploadNftAssets = async (path: string) => {
  const files = readdirSync(path).filter(fileName => !ignoredFiles.includes(fileName));
  const fileObjs = files.map(fileName => {
    const name = fileName.split('.')[0];
    const filePath = join(path, fileName);
    return new File([readFileSync(filePath)], name);
  });
  return await client.storeDirectory(fileObjs);
};

const readCSV = (cid: string, csvPath: string) => {
  const whalesToMetadata: Record<string, erc721Metadata> = {};
  const readableStream = createReadStream(csvPath).pipe(csv());
  readableStream
    .on('data', (d: row) => {
      console.log(d);
      whalesToMetadata[d.whale] = {
        name: d.name,
        description: d.description,
        image: ['ipfs:/', cid, d.whale].join('/'),
        attributes: [
          { trait_type: 'eyes', value: d['trait 1 (eyes)'] },
          { trait_type: 'blowhole', value: d['trait 2 (Blowhole)'] },
          { trait_type: 'background', value: d['trait 3 (background)'] },
        ],
      };
    })
    .on('end', () => {
      readableStream.destroy();
      uploadNftMetadata(whalesToMetadata, cid);
    });
};

export const uploadNftMetadata = async (
  whalesToMetadata: Record<string, erc721Metadata>,
  assetsCID: string,
): Promise<void> => {
  const jsonPath = join(__dirname, 'whales_json');

  if (!existsSync(jsonPath)) {
    mkdirSync(jsonPath);
  }

  const files = Object.keys(whalesToMetadata);
  files.forEach(name => {
    const metadata = whalesToMetadata[name];
    const metadataPath = join(jsonPath, `${name}.json`);
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  });

  const jsonFileNames = readdirSync(jsonPath);
  const jsonFileObjs = jsonFileNames.map(fileName => {
    const name = fileName.split('.')[0];
    const filePath = join(jsonPath, fileName);
    return new File([readFileSync(filePath)], name);
  });

  const metadataCID = await client.storeDirectory(jsonFileObjs);

  console.log(`Assets Directory CID: ${assetsCID}`);
  console.log(`Metadata Directory CID: ${metadataCID}`);
};

const executor = async (args: string[]): Promise<void> => {
  const [assetsPath, csvPath] = args;
  const assetsCID = await uploadNftAssets(assetsPath);
  readCSV(assetsCID, csvPath);
};

executor(process.argv.slice(-2));
