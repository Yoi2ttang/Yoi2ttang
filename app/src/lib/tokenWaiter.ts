let tokenResolver: ((token: string) => void) | null = null;

export const waitForTokenFromWebView = (): Promise<string> => {
  return new Promise(resolve => {
    tokenResolver = resolve;
  });
};

export const resolveTokenFromWebView = (token: string) => {
  if (tokenResolver) {
    tokenResolver(token);
    tokenResolver = null;
  }
};
