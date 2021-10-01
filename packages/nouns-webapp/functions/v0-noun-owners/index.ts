import { Handler } from '@netlify/functions';
import { NormalizedNoun, nounsQuery } from '../theGraph';
import * as R from 'ramda'

export interface LiteNoun {
  id: number;
  owner: string;
  delegatedTo: null | string;
}

const lightenNoun = R.pick(['id', 'owner', 'delegatedTo'])

const lightenNouns = R.map(lightenNoun)

const handler: Handler = async (event, context) => {
  const nouns = await nounsQuery();
  const liteNouns: LiteNoun[] = lightenNouns(nouns)
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(liteNouns)
  };
};

export { handler };
