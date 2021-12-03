export const generateIpfsRestUrl = (ipfsUrl: string): string => {
  const urlPart = ipfsUrl?.split('://')?.pop();
  return `https://ipfs.io/ipfs/${urlPart}`;
};

export const generatePinataRestUrl = (ipfsUrl: string): string => {
  const urlPart = ipfsUrl?.split('://')?.pop();
  return `https://gateway.pinata.cloud/ipfs/${urlPart}`
};