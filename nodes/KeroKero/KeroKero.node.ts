import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { instanceDescription } from './resources/instance';
import { messageDescription } from './resources/message';
import { chatDescription } from './resources/chat';
import { getInstances } from './listSearch/getInstances';

export class KeroKero implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Kero-Kero',
        name: 'kero-kero',
        icon: 'file:kerokero.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with Kero-Kero WhatsApp API',
        defaults: {
            name: 'KeroKero',
        },
        usableAsTool: true,
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        credentials: [
            {
                name: 'kerokeroApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: '={{$credentials.apiUrl}}',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Chat',
                        value: 'chat',
                    },
                    {
                        name: 'Instance',
                        value: 'instance',
                    },
                    {
                        name: 'Message',
                        value: 'message',
                    },
                ],
                default: 'message',
            },
            ...chatDescription,
            ...instanceDescription,
            ...messageDescription,
        ],
    };

    methods = {
        listSearch: {
            getInstances,
        },
    };
}
