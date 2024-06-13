import type { Uri } from 'vscode';
import type { Container } from '../../../container';
import type { DeferredEventExecutor } from '../../../system/event';
import { IssueIntegrationId } from '../providers/models';
import { IntegrationAuthenticationProvider } from './integrationAuthentication';

export class JiraAuthenticationProvider extends IntegrationAuthenticationProvider {
	constructor(container: Container) {
		super(container, IssueIntegrationId.Jira);
	}

	protected override getCompletionInputTitle(): string {
		return 'Connect to Jira';
	}

	protected override getUriHandlerDeferredExecutor(): DeferredEventExecutor<Uri, string> {
		return (uri: Uri, resolve, reject) => {
			const queryParams: URLSearchParams = new URLSearchParams(uri.query);
			const provider = queryParams.get('provider');
			if (provider !== IssueIntegrationId.Jira) {
				reject('Invalid provider');
				return;
			}

			resolve(uri.toString(true));
		};
	}
}
