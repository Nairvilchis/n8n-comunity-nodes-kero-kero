import type { INodeProperties } from 'n8n-workflow';

export const instanceDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['instance'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new WhatsApp instance',
                action: 'Create an instance',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/instances',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a WhatsApp instance',
                action: 'Delete an instance',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/instances/{{$parameter["instanceName"]}}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get information about an instance',
                action: 'Get an instance',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/instances/{{$parameter["instanceName"]}}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many instances',
                action: 'Get many instances',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/instances',
                    },
                },
            },
            {
                name: 'Get QR Code',
                value: 'getQR',
                description: 'Get QR code for connecting instance',
                action: 'Get QR code',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/instances/{{$parameter["instanceName"]}}/qr',
                    },
                },
            },
            {
                name: 'Get Status',
                value: 'getStatus',
                description: 'Get connection status of instance',
                action: 'Get status',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/instances/{{$parameter["instanceName"]}}/status',
                    },
                },
            },
            {
                name: 'Logout',
                value: 'logout',
                description: 'Disconnect and logout instance',
                action: 'Logout instance',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/disconnect',
                    },
                },
            },
            {
                name: 'Update Settings',
                value: 'update',
                description: 'Update instance settings',
                action: 'Update settings',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/instances/{{$parameter["instanceName"]}}',
                    },
                },
            },
        ],
        default: 'create',
    },
    // Create operation
    {
        displayName: 'Instance Name',
        name: 'instanceName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['create'],
            },
        },
        default: '',
        placeholder: 'my-whatsapp-bot',
        description: 'Unique name for the WhatsApp instance',
        routing: {
            send: {
                type: 'body',
                property: 'instanceName',
            },
        },
    },
    // Get, Delete, GetQR, GetStatus, Logout operations
    {
        displayName: 'Instance Name',
        name: 'instanceName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['get', 'delete', 'getQR', 'getStatus', 'logout'],
            },
        },
        default: '',
        description: 'Name of the instance',
    },
    // Update operation - Instance Name
    {
        displayName: 'Instance Name',
        name: 'instanceName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['update'],
            },
        },
        default: '',
        description: 'Name of the instance to update',
    },
    // Update Settings Fields
    {
        displayName: 'Reject Calls',
        name: 'rejectCalls',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['update'],
            },
        },
        default: false,
        description: 'Whether to automatically reject incoming calls',
        routing: {
            send: {
                type: 'body',
                property: 'rejectCalls',
            },
        },
    },
    {
        displayName: 'Always Online',
        name: 'alwaysOnline',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['update'],
            },
        },
        default: false,
        description: 'Whether to keep online status active',
        routing: {
            send: {
                type: 'body',
                property: 'alwaysOnline',
            },
        },
    },
    {
        displayName: 'Read Messages',
        name: 'readMessages',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['update'],
            },
        },
        default: false,
        description: 'Whether to mark messages as read automatically',
        routing: {
            send: {
                type: 'body',
                property: 'readMessages',
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhookUrl',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['update'],
            },
        },
        default: '',
        placeholder: 'https://your-webhook.com/webhook',
        description: 'Webhook URL for receiving events',
        routing: {
            send: {
                type: 'body',
                property: 'webhook',
                value: {
                    url: '={{$parameter.webhookUrl}}',
                    enabled: true,
                },
            },
        },
    },
];
