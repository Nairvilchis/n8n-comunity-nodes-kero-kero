import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';

export async function getInstances(
    this: ILoadOptionsFunctions,
): Promise<INodeListSearchResult> {
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
                url: `${credentials.apiUrl}/instances/${instance.instanceID}`,
            })),
        };
    } catch {
        return {
            results: [],
        };
    }
}
