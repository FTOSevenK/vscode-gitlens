import type { Branded } from '../../system/brand';

export type GkProviderId = Branded<
	'github' | 'githubEnterprise' | 'gitlab' | 'gitlabSelfHosted' | 'bitbucket' | 'bitbucketServer' | 'azureDevops',
	'GkProviderId'
>;
export type GkRepositoryId = Branded<string, 'GkRepositoryId'>;

export interface RepositoryIdentity {
	readonly id: GkRepositoryId;
	readonly createdAt: string;
	readonly updatedAt: string;

	readonly initialCommitSha?: string;
	readonly remote?: {
		readonly url?: string;
		readonly domain?: string;
		readonly path?: string;
	};
	readonly provider?: {
		readonly id?: GkProviderId;
		readonly repoDomain?: string;
		readonly repoName?: string;
		readonly repoOwnerDomain?: string;
	};
}

type BaseRepositoryIdentityRequest = {
	initialCommitSha?: string;
};

type BaseRepositoryIdentityRequestWithCommitSha = BaseRepositoryIdentityRequest & {
	initialCommitSha: string;
};

type BaseRepositoryIdentityRequestWithRemote = BaseRepositoryIdentityRequest & {
	remote: { url: string; domain: string; path: string };
};

type BaseRepositoryIdentityRequestWithRemoteProvider = BaseRepositoryIdentityRequestWithRemote & {
	provider: {
		id: GkProviderId;
		repoDomain: string;
		repoName: string;
		repoOwnerDomain?: string;
	};
};

type BaseRepositoryIdentityRequestWithoutRemoteProvider = BaseRepositoryIdentityRequestWithRemote & {
	provider?: never;
};

export type RepositoryIdentityRequest =
	| BaseRepositoryIdentityRequestWithCommitSha
	| BaseRepositoryIdentityRequestWithRemote
	| BaseRepositoryIdentityRequestWithRemoteProvider
	| BaseRepositoryIdentityRequestWithoutRemoteProvider;
