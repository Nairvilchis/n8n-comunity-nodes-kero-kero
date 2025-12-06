import {
    IHookFunctions,
    IWebhookFunctions,
    ILoadOptionsFunctions,
    INodeType,
    INodeTypeDescription,
    IWebhookResponseData,
    NodeConnectionTypes,
} from 'n8n-workflow';

export class KeroKeroTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Kero-Kero Trigger',
        name: 'kerokeroTrigger',
        icon: 'file:kerokero.svg',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["event"]}}',
        description: 'Starts the workflow when Kero-Kero events occur',
        defaults: {
            name: 'KeroKero Trigger',
        },
        inputs: [],
        outputs: [NodeConnectionTypes.Main],
        credentials: [
            {
                name: 'kerokeroApi',
                required: true,
            },
        ],
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: 'webhook',
            },
        ],
        properties: [
            {
                displayName: 'Instance Name',
                name: 'instanceName',
                type: 'resourceLocator',
                default: { mode: 'list', value: '' },
                required: true,
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        type: 'list',
                        typeOptions: {
                            searchListMethod: 'getInstances',
                            searchable: true,
                        },
                    },
                    {
                        displayName: 'By Name',
                        name: 'name',
                        type: 'string',
                        placeholder: 'my-instance',
                    },
                ],
                description: 'The WhatsApp instance to monitor',
            },
            {
                displayName: 'Event',
                name: 'event',
                type: 'options',
                options: [
                    {
                        name: 'Message Received',
                        value: 'message',
                        description: 'Trigger on new messages',
                    },
                    {
                        name: 'Group Message Received',
                        value: 'groupMessage',
                        description: 'Trigger on new group messages',
                    },
                    {
                        name: 'Status Changed',
                        value: 'statusChange',
                        description: 'Trigger when connection status changes',
                    },
                    {
                        name: 'Call Received',
                        value: 'call',
                        description: 'Trigger on incoming calls',
                    },
                    {
                        name: 'Presence Update',
                        value: 'presence',
                        description: 'Trigger when a user is typing or recording',
                    },
                    {
                        name: 'Any Event',
                        value: 'any',
                        description: 'Trigger on any event',
                    },
                ],
                default: 'message',
                description: 'The event to listen for',
            },
            {
                displayName: 'Message Type',
                name: 'messageType',
                type: 'options',
                displayOptions: {
                    show: {
                        event: ['message', 'groupMessage'],
                    },
                },
                options: [
                    {
                        name: 'Any',
                        value: 'any',
                    },
                    {
                        name: 'Text',
                        value: 'text',
                    },
                    {
                        name: 'Image',
                        value: 'image',
                    },
                    {
                        name: 'Video',
                        value: 'video',
                    },
                    {
                        name: 'Document',
                        value: 'document',
                    },
                    {
                        name: 'Audio',
                        value: 'audio',
                    },
                    {
                        name: 'Location',
                        value: 'location',
                    },
                    {
                        name: 'Contact',
                        value: 'contact',
                    },
                ],
                default: 'any',
                description: 'Filter by message type',
            },
            {
                displayName: 'From Number',
                name: 'fromNumber',
                type: 'string',
                displayOptions: {
                    show: {
                        event: ['message'],
                    },
                },
                default: '',
                placeholder: '1234567890',
                description: 'Filter messages from specific number (optional)',
            },
            {
                displayName: 'Group ID',
                name: 'groupId',
                type: 'string',
                displayOptions: {
                    show: {
                        event: ['groupMessage'],
                    },
                },
                default: '',
                placeholder: '123456789@g.us',
                description: 'Filter messages from specific group (optional)',
            },
        ],
    };

    methods = {
        listSearch: {
            async getInstances(this: ILoadOptionsFunctions) {
                const credentials = await this.getCredentials('kerokeroApi');

                try {
                    const response = await this.helpers.httpRequest({
                        method: 'GET',
                        url: `${credentials.apiUrl}/instances`,
                        headers: {
                            Authorization: `Bearer ${credentials.apiKey}`,
                        },
                        json: true,
                    });

                    const instances = Array.isArray(response) ? response : [];

                    return {
                        results: instances.map((instance: { instanceID?: string }) => ({
                            name: instance.instanceID || '',
                            value: instance.instanceID || '',
                        })),
                    };
                } catch {
                    return {
                        results: [],
                    };
                }
            },
        },
    };

    webhookMethods = {
        default: {
            async checkExists(this: IHookFunctions): Promise<boolean> {
                const webhookUrl = this.getNodeWebhookUrl('default') as string;
                const instanceName = this.getNodeParameter('instanceName', '') as string;
                const credentials = await this.getCredentials('kerokeroApi');

                try {
                    const response = await this.helpers.httpRequest({
                        method: 'GET',
                        url: `${credentials.apiUrl}/instances/${instanceName}/webhook`,
                        headers: {
                            Authorization: `Bearer ${credentials.apiKey}`,
                        },
                        json: true,
                    });

                    return response?.url === webhookUrl;
                } catch {
                    return false;
                }
            },

            const credentials = await this.getCredentials('kerokeroApi');

            try {
                await this.helpers.httpRequest({
                    method: 'POST',
                    url: `${credentials.apiUrl}/instances/${instanceName}/webhook`,
                    body: {
                        url: webhookUrl,
                    },
                    json: true,
                });

                return true;
            } catch(error) {
                throw new Error(`Failed to register webhook: ${error}`);
            }
        },

        async delete(this: IHookFunctions): Promise<boolean> {
            const instanceName = this.getNodeParameter('instanceName', '') as string;
            const credentials = await this.getCredentials('kerokeroApi');

            try {
                await this.helpers.httpRequest({
                    method: 'DELETE',
                    url: `${credentials.apiUrl}/instances/${instanceName}/webhook`,
                    headers: {
                        Authorization: `Bearer ${credentials.apiKey}`,
                    },
                    json: true,
                });

                return true;
            } catch {
                return false;
            }
        },
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const bodyData = this.getBodyData();
        const event = this.getNodeParameter('event') as string;
        const messageType = this.getNodeParameter('messageType', 'any') as string;
        const fromNumber = this.getNodeParameter('fromNumber', '') as string;
        const groupId = this.getNodeParameter('groupId', '') as string;

        // Filter based on event type
        if (event !== 'any') {
            const eventType = (bodyData as any)?.event || (bodyData as any)?.type;

            if (event === 'message' && eventType !== 'message') {
                return { noWebhookResponse: true };
            }

            if (event === 'groupMessage' && (!eventType?.includes('group') && !eventType?.includes('message'))) {
                return { noWebhookResponse: true };
            }

            if (event === 'statusChange' && eventType !== 'status') {
                return { noWebhookResponse: true };
            }

            if (event === 'call' && eventType !== 'call') {
                return { noWebhookResponse: true };
            }

            if (event === 'presence' && eventType !== 'presence') {
                return { noWebhookResponse: true };
            }
        }

        // Filter by message type
        if (messageType !== 'any' && (event === 'message' || event === 'groupMessage')) {
            const msgType = (bodyData as any)?.message?.type || (bodyData as any)?.messageType;
            if (msgType !== messageType) {
                return { noWebhookResponse: true };
            }
        }

        // Filter by sender number
        if (fromNumber && event === 'message') {
            const from = (bodyData as any)?.from || (bodyData as any)?.sender;
            if (!from?.includes(fromNumber)) {
                return { noWebhookResponse: true };
            }
        }

        // Filter by group ID
        if (groupId && event === 'groupMessage') {
            const chatId = (bodyData as any)?.chatId || (bodyData as any)?.from;
            if (chatId !== groupId) {
                return { noWebhookResponse: true };
            }
        }

        return {
            workflowData: [this.helpers.returnJsonArray(bodyData)],
        };
    }
}
