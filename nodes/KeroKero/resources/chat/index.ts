import type { INodeProperties } from 'n8n-workflow';

export const chatDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['chat'],
            },
        },
        options: [
            {
                name: 'Archive',
                value: 'archive',
                description: 'Archive or unarchive a chat',
                action: 'Archive a chat',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/chats/archive',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a chat',
                action: 'Delete a chat',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/instances/{{$parameter["instanceName"]}}/chats/{{$parameter["jid"]}}',
                    },
                },
            },
            {
                name: 'Get History',
                value: 'getHistory',
                description: 'Get chat message history',
                action: 'Get chat history',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/instances/{{$parameter["instanceName"]}}/chats/{{$parameter["jid"]}}/messages',
                    },
                },
            },
            {
                name: 'Mark as Read',
                value: 'markAsRead',
                description: 'Mark chat messages as read',
                action: 'Mark as read',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/chats/{{$parameter["jid"]}}/read',
                    },
                },
            },
            {
                name: 'Update Status',
                value: 'updateStatus',
                description: 'Update user status (About)',
                action: 'Update status',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/chats/status',
                    },
                },
            },
        ],
        default: 'getHistory',
    },
    // Instance Name (for all chat operations)
    {
        displayName: 'Instance Name',
        name: 'instanceName',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        required: true,
        displayOptions: {
            show: {
                resource: ['chat'],
            },
        },
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
        description: 'The WhatsApp instance to use',
    },
    // JID (for chat operations except updateStatus)
    {
        displayName: 'Chat ID (JID)',
        name: 'jid',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['chat'],
                operation: ['archive', 'delete', 'getHistory', 'markAsRead'],
            },
        },
        default: '',
        placeholder: '1234567890@s.whatsapp.net',
        description: 'The JID of the chat (e.g., 1234567890@s.whatsapp.net)',
        routing: {
            send: {
                type: 'body',
                property: 'phone',
            },
        },
    },
    // Archive Status
    {
        displayName: 'Archived',
        name: 'archived',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['chat'],
                operation: ['archive'],
            },
        },
        default: true,
        description: 'Whether to archive (true) or unarchive (false) the chat',
        routing: {
            send: {
                type: 'body',
                property: 'archived',
            },
        },
    },
    // Status Text (About)
    {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['chat'],
                operation: ['updateStatus'],
            },
        },
        default: '',
        placeholder: 'Available',
        description: 'The new status text',
        routing: {
            send: {
                type: 'body',
                property: 'status',
            },
        },
    },
];
