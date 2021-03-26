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
export declare function searchUser(name: string): Promise<UserNodeType>;
