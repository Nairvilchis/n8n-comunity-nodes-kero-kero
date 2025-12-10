import type { INodeProperties } from 'n8n-workflow';

export const messageDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['message'],
            },
        },
        options: [
            {
                name: 'Send Audio',
                value: 'sendAudio',
                description: 'Send an audio file',
                action: 'Send an audio file',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/audio',
                    },
                },
            },
            {
                name: 'Send Contact',
                value: 'sendContact',
                description: 'Send a contact',
                action: 'Send a contact',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/contact',
                    },
                },
            },
            {
                name: 'Send Document',
                value: 'sendDocument',
                description: 'Send a document',
                action: 'Send a document',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/document',
                    },
                },
            },
            {
                name: 'Send Image',
                value: 'sendImage',
                description: 'Send an image',
                action: 'Send an image',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/image',
                    },
                },
            },
            {
                name: 'Send Location',
                value: 'sendLocation',
                description: 'Send a location',
                action: 'Send a location',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/location',
                    },
                },
            },
            {
                name: 'Send Poll',
                value: 'sendPoll',
                description: 'Send a poll/survey',
                action: 'Send a poll',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/poll',
                    },
                },
            },
            {
                name: 'Send Text',
                value: 'sendText',
                description: 'Send a text message',
                action: 'Send a text message',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/text',
                    },
                },
            },
            {
                name: 'Send Video',
                value: 'sendVideo',
                description: 'Send a video',
                action: 'Send a video',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/instances/{{$parameter["instanceName"]}}/messages/video',
                    },
                },
            },
        ],
        default: 'sendText',
    },
    // Instance Name (for all message operations)
    {
        displayName: 'Instance Name',
        name: 'instanceName',
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
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
    // Phone Number (for all message operations)
    {
        displayName: 'Phone Number',
        name: 'number',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
            },
        },
        default: '',
        placeholder: '1234567890',
        description: 'Phone number without + or country code prefix',
        routing: {
            send: {
                type: 'body',
                property: 'phone',
            },
        },
    },
    // Send Text - Message field
    {
        displayName: 'Message',
        name: 'text',
        type: 'string',
        required: true,
        typeOptions: {
            rows: 4,
        },
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText'],
            },
        },
        default: '',
        description: 'The text message to send',
        routing: {
            send: {
                type: 'body',
                property: 'message',
            },
        },
    },
    // Send Image - Media URL
    {
        displayName: 'Image URL',
        name: 'media',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage'],
            },
        },
        default: '',
        placeholder: 'https://example.com/image.jpg',
        description: 'URL of the image to send',
        routing: {
            send: {
                type: 'body',
                property: 'media_url',
            },
        },
    },
    // Send Image - Caption
    {
        displayName: 'Caption',
        name: 'caption',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage'],
            },
        },
        default: '',
        description: 'Optional caption for the image',
        routing: {
            send: {
                type: 'body',
                property: 'caption',
            },
        },
    },
    // Send Video - Media URL
    {
        displayName: 'Video URL',
        name: 'media',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendVideo'],
            },
        },
        default: '',
        placeholder: 'https://example.com/video.mp4',
        description: 'URL of the video to send',
        routing: {
            send: {
                type: 'body',
                property: 'media_url',
            },
        },
    },
    // Send Video - Caption
    {
        displayName: 'Caption',
        name: 'caption',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendVideo'],
            },
        },
        default: '',
        description: 'Optional caption for the video',
        routing: {
            send: {
                type: 'body',
                property: 'caption',
            },
        },
    },
    // Send Document - Media URL
    {
        displayName: 'Document URL',
        name: 'media',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendDocument'],
            },
        },
        default: '',
        placeholder: 'https://example.com/document.pdf',
        description: 'URL of the document to send',
        routing: {
            send: {
                type: 'body',
                property: 'media_url',
            },
        },
    },
    // Send Document - File Name
    {
        displayName: 'File Name',
        name: 'fileName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendDocument'],
            },
        },
        default: '',
        placeholder: 'document.pdf',
        description: 'Optional file name for the document',
        routing: {
            send: {
                type: 'body',
                property: 'file_name',
            },
        },
    },
    // Send Document - Caption
    {
        displayName: 'Caption',
        name: 'caption',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendDocument'],
            },
        },
        default: '',
        description: 'Optional caption for the document',
        routing: {
            send: {
                type: 'body',
                property: 'caption',
            },
        },
    },
    // Send Audio - Audio URL
    {
        displayName: 'Audio URL',
        name: 'audio',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendAudio'],
            },
        },
        default: '',
        placeholder: 'https://example.com/audio.mp3',
        description: 'URL of the audio file to send',
        routing: {
            send: {
                type: 'body',
                property: 'media_url',
            },
        },
    },
    // Send Location - Latitude
    {
        displayName: 'Latitude',
        name: 'latitude',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendLocation'],
            },
        },
        default: 0,
        placeholder: '19.4326',
        description: 'Latitude coordinate',
        routing: {
            send: {
                type: 'body',
                property: 'latitude',
            },
        },
    },
    // Send Location - Longitude
    {
        displayName: 'Longitude',
        name: 'longitude',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendLocation'],
            },
        },
        default: 0,
        placeholder: '-99.1332',
        description: 'Longitude coordinate',
        routing: {
            send: {
                type: 'body',
                property: 'longitude',
            },
        },
    },
    // Send Location - Name
    {
        displayName: 'Location Name',
        name: 'name',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendLocation'],
            },
        },
        default: '',
        placeholder: 'My Location',
        description: 'Optional name for the location',
        routing: {
            send: {
                type: 'body',
                property: 'name',
            },
        },
    },
    // Send Location - Address
    {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendLocation'],
            },
        },
        default: '',
        placeholder: 'Full address',
        description: 'Optional address for the location',
        routing: {
            send: {
                type: 'body',
                property: 'address',
            },
        },
    },
    // Send Contact - Display Name
    {
        displayName: 'Contact Name',
        name: 'displayName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendContact'],
            },
        },
        default: '',
        placeholder: 'John Doe',
        description: 'Name of the contact',
        routing: {
            send: {
                type: 'body',
                property: 'display_name',
            },
        },
    },
    // Send Contact - vCard
    {
        displayName: 'vCard',
        name: 'vcard',
        type: 'string',
        required: true,
        typeOptions: {
            rows: 4,
        },
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendContact'],
            },
        },
        default: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:1234567890\nEND:VCARD',
        description: 'VCard format contact information',
        routing: {
            send: {
                type: 'body',
                property: 'vcard',
            },
        },
    },
    // Send Poll - Question
    {
        displayName: 'Poll Question',
        name: 'name',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendPoll'],
            },
        },
        default: '',
        placeholder: 'What is your favorite color?',
        routing: {
            send: {
                type: 'body',
                property: 'question',
            },
        },
    },
    // Send Poll - Options
    {
        displayName: 'Options',
        name: 'options',
        type: 'fixedCollection',
        required: true,
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendPoll'],
            },
        },
        default: {},
        options: [
            {
                name: 'option',
                displayName: 'Option',
                values: [
                    {
                        displayName: 'Option Text',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'Text for this poll option',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'options',
                value: '={{ $parameter.options.option.map(o => o.value) }}',
            },
        },
    },
    // Send Poll - Select Count
    {
        displayName: 'Number of Selections Allowed',
        name: 'selectCount',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendPoll'],
            },
        },
        default: 1,
        description: 'Number of options users can select (default: 1)',
        routing: {
            send: {
                type: 'body',
                property: 'selectable_count',
            },
        },
    },
];
