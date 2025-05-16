export interface GitHubResponse {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
    pinnedItems: {
      nodes: {
        name: string;
        description: string;
        openGraphImageUrl: string;
        url: string;
      }[];
    };
    socialAccounts: {
      nodes: {
        displayName: string;
        provider: string;
        url: string;
      }[];
    };
  };
}

