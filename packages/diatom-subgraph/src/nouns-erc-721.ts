import { log } from '@graphprotocol/graph-ts';
import { WhaleCreated, Transfer } from './types/WhalezToken/WhalezToken';
import { BIGINT_ONE, BIGINT_ZERO, ZERO_ADDRESS } from './utils/constants';
import { getOrCreateAccount } from './utils/helpers';
import { Whale } from './types/schema';

export function handleWhaleCreated(event: WhaleCreated): void {
  let whaleId = event.params.tokenId.toString();

  let whale = Whale.load(whaleId);
  if (whale == null) {
    log.error('[handleWhaleCreated] Whale #{} not found. Hash: {}', [
      whaleId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  whale.save();
}

let transferredWhaleId: string; // Use WebAssembly global due to lack of closure support
export function handleTransfer(event: Transfer): void {
  let fromHolder = getOrCreateAccount(event.params.from.toHexString());
  let toHolder = getOrCreateAccount(event.params.to.toHexString());
  transferredWhaleId = event.params.tokenId.toString();

  // fromHolder
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    fromHolder.tokenBalanceRaw = fromHolder.tokenBalanceRaw - BIGINT_ONE;
    fromHolder.tokenBalance = fromHolder.tokenBalanceRaw;
    let fromHolderWhales = fromHolder.whales; // Re-assignment required to update array
    fromHolder.whales = fromHolderWhales.filter(n => n !== transferredWhaleId);

    if (fromHolder.tokenBalanceRaw < BIGINT_ZERO) {
      log.error('Negative balance on holder {} with balance {}', [
        fromHolder.id,
        fromHolder.tokenBalanceRaw.toString(),
      ]);
    }

    fromHolder.save();
  }

  toHolder.tokenBalanceRaw = toHolder.tokenBalanceRaw + BIGINT_ONE;
  toHolder.tokenBalance = toHolder.tokenBalanceRaw;
  toHolder.totalTokensHeldRaw = toHolder.totalTokensHeldRaw + BIGINT_ONE;
  toHolder.totalTokensHeld = toHolder.totalTokensHeldRaw;
  let toHolderWhales = toHolder.whales; // Re-assignment required to update array
  toHolderWhales.push(event.params.tokenId.toString());
  toHolder.whales = toHolderWhales;

  let whale = Whale.load(transferredWhaleId);
  if (whale == null) {
    whale = new Whale(transferredWhaleId);
  }

  whale.owner = toHolder.id;
  whale.save();

  toHolder.save();
}
