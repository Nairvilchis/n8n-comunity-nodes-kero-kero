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
                name: 'Connect',
                value: 'connect',
                description: 'Connect an instance to WhatsApp',
                action: 'Connect instance',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/connect',
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
                property: 'instance_id',
                value: '={{$parameter["instanceName"]}}',
            },
        },
    },
    // Create operation - Webhook URL
    {
        displayName: 'Webhook URL',
        name: 'webhookUrl',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['create'],
            },
        },
        default: '',
        placeholder: 'https://your-webhook.com/webhook',
        description: 'Optional webhook URL for receiving events from this instance',
        routing: {
            send: {
                type: 'body',
                property: 'webhook_url',
            },
        },
    },
    // Create operation - Sync History
    {
        displayName: 'Sync Chat History',
        name: 'syncHistory',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['create'],
            },
        },
        default: false,
        description: 'Whether to sync chat history when connecting the instance',
        routing: {
            send: {
                type: 'body',
                property: 'sync_history',
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
                operation: ['connect', 'get', 'delete', 'getQR', 'getStatus', 'logout'],
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
        displayName: 'Instance Name',
        name: 'name',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['update'],
            },
        },
        default: '',
        placeholder: 'My WhatsApp Instance',
        description: 'Optional new name for the instance',
        routing: {
            send: {
                type: 'body',
                property: 'name',
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
                property: 'webhook_url',
            },
        },
    },
    {
        displayName: 'Sync Chat History',
        name: 'syncHistory',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['instance'],
                operation: ['update'],
            },
        },
        default: false,
        description: 'Whether to sync chat history when connecting the instance',
        routing: {
            send: {
                type: 'body',
                property: 'sync_history',
            },
        },
    },
];
