import type {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class KeroKeroApi implements ICredentialType {
    name = 'kerokeroApi';

    displayName = 'KeroKero API';

    icon = 'file:kerokero.svg' as const;

    documentationUrl = 'https://docs.kerokero.com';

    properties: INodeProperties[] = [
        {
            displayName: 'API URL',
            name: 'apiUrl',
            type: 'string',
            default: 'http://localhost:8080',
            placeholder: 'https://api.kerokero.com',
            description: 'The base URL of your KeroKero API server',
        },
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'Your KeroKero API key for authentication',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '=Bearer {{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.apiUrl}}',
            url: '/instances',
            method: 'GET',
        },
    };
}
