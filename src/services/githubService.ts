import { GraphQLClient, gql } from "graphql-request";
import dotenv from "dotenv";
import { GitHubResponse } from "../types/github";

dotenv.config();

const endpoint = "https://api.github.com/graphql";

const pinnedQuery = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      name
      bio
      avatarUrl
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            openGraphImageUrl
            url
          }
        }
      }
      socialAccounts(first: 4) {
        nodes {
          displayName
          provider
          url
        }
      }
    }
  }
`;

export async function fetchPinnedProfile(
  username: string,
  token: string
): Promise<GitHubResponse["user"]> {
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const variables = { login: username };

  const data = await client.request<GitHubResponse>(pinnedQuery, variables);
  return data.user;
}
