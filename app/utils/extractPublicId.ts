export const extractPublicId = (url: string) => {
  const match = url.match(/\/([^\/]+)\.\w+$/);
  return match ? match[1] : null;
};
