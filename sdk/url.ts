export const relative = (url: string): string | undefined => {
  const link = new URL(url);
  return url ? `${link.pathname}` : undefined;
};
