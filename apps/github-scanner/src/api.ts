import axios from 'axios';

const githubToken = 'ed4de92a758482684e83d6ad72c3e5f152e108ab'; // only has search access

const ax = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${githubToken}`,
  },
  timeout: 15000,
});

export interface UserSearchResultType {
  userCount: number;
  edges: UserEdgeType[];
}

export interface UserEdgeType {
  node: UserNodeType;
  cursor: string;
}

export interface UserNodeType {
  name: string;
  avatarUrl: string;
  url: string;
  websiteUrl: string;
  followers: {
    totalCount: number;
  };
  id: string;
  login: string;
  createdAt: string;
  repositories: RepoSearchType;
}

export interface RepoSearchType {
  totalCount: number;
  nodes: RepoNodeType[];
}

export interface RepoNodeType {
  name: string;
  url: string;
  updatedAt: string;
  description: string;
  primaryLanguage: {
    name: string;
  };
  stargazerCount: number;
}

/**
 * 搜索用户
 *
 * @param name - 登录名
 */
export async function searchUser(name: string): Promise<UserNodeType> {
  const d = await ax.post('', createUserDetailGQL(name));
  return d.data.data.user;
}

function createRepoDetailGQL(param: { owner: string; repoName: string }) {
  return {
    query: `{
      repository(name: "${param.repoName}", owner: "${param.owner}") {
        forkCount
        id
        name
        sshUrl
        createdAt
        description
        collaborators(first: 20) {
          totalCount
          nodes {
            name
            avatarUrl
          }
        }
        languages(first: 10) {
          nodes {
            name
            color
          }
        }
        issues(first: 0) {
          totalCount
        }
        stargazers(first: 0) {
          totalCount
        }
      }
    }
    `,
  };
}

function createUserListGQL(name: string) {
  return {
    query: `
query searchUser($after: String, $before: String, $first: Int, $last: Int) {
search(query: "${name}", type:USER, after: $after, before: $before, first: $first, last: $last) {
  userCount
  pageInfo {
    hasNextPage
    hasPreviousPage
  }
  edges {
    cursor
    node {
      ... on User {
        name
        avatarUrl
        id
        login
        isSiteAdmin
        createdAt
        repositories(first: 10) {
            totalCount
            nodes {
              ... on Repository {
                name
                url
                updatedAt
                description
                primaryLanguage {
                  name
                }
                stargazerCount
              }
            }
          }
      }
    }
  }
}
}
`,
    variables: {
      first: 10,
    },
  };
}

function createUserDetailGQL(loginId: string) {
  return {
    query: `
  query {
  user(login: "${loginId}") {
    name
    url
    websiteUrl
    avatarUrl
    followers {
      totalCount
    }
    createdAt
    repositories(first: 5, orderBy: {
      field: STARGAZERS,
      direction: DESC
    }) {
      nodes {
        ... on Repository {
          name
          url
          updatedAt
          description
          primaryLanguage {
            name
          }
          stargazerCount
        }
      }
    }
  }
}
  `,
  };
}

type RepositoriesRequestType = {
  loginId: string;
  pageSize?: number;
  after?: boolean;
  cursor?: string | null;
};

function createRepositroyOwnerGQL(query: RepositoriesRequestType) {
  const { pageSize = 10, loginId, cursor = null, after = true } = query;
  return {
    query: `
    {
      repositoryOwner(login: "${loginId}") {
        repositories(${after ? 'after' : 'before'}: "${cursor}", ${
      after ? 'first' : 'last'
    }: ${pageSize}) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          nodes {
            name
            nameWithOwner
            isFork
            isPrivate
            stargazers {
              totalCount
            }
            createdAt
            stargazers {
              totalCount
            }
          }
        }
      }
    }
    `.replace(/"null"/g, 'null'),
  };
}
