export enum ExternalURL {
  discord,
  twitter,
  github
}

export const externalURL = (externalURL: ExternalURL) => {
  switch (externalURL) {
    case ExternalURL.discord:
      return 'https://discord.gg/aXyGv9YPAC';
    case ExternalURL.twitter:
      return 'https://twitter.com/diatomdao';
    // case ExternalURL.notion:
    //   return 'https://whalezs.notion.site/Explore-Whalezs-a2a9dceeb1d54e10b9cbf3f931c2266f';
    // case ExternalURL.discourse:
    //   return 'https://discourse.whalezs.wtf/';
    case ExternalURL.github:
      return 'https://github.com/Dollar-Donation-Club/diatom-monorepo';
  }
};
