export const toRepositoryBrowserUrl = (repositoryUrl: string) => {
  return repositoryUrl.replace(/^git\+/, "").replace(/\.git$/, "");
};
