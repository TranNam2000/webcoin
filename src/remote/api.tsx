import {NextResponse} from 'next/server';

const API_BASE_URL = 'http://139.180.189.133:8000/api';


async function handleGetRequest(request: Request) {
    try {
        const apiUrl = `${API_BASE_URL}/data`;
        const response = await fetch(apiUrl, {method: 'GET'});
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});
    } catch (error) {
        console.error('GET request failed:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}

async function handlePostRequest(request: Request) {
    try {
        const body = await request.json();
        const apiUrl = `${API_BASE_URL}/login`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});
    } catch (error) {
        console.error('POST request failed:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}

async function handlePutRequest(request: Request) {
    try {
        const body = await request.json();
        const apiUrl = `${API_BASE_URL}/update`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});
    } catch (error) {
        console.error('PUT request failed:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}

async function handleDeleteRequest(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json(
                {error: 'ID is required for DELETE'},
                {status: 400}
            );
        }
        const apiUrl = `${API_BASE_URL}/delete/${id}`;
        const response = await fetch(apiUrl, {method: 'DELETE'});
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});
    } catch (error) {
        console.error('DELETE request failed:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}

export async function GET(request: Request) {
    return handleGetRequest(request);
}

export async function POST(request: Request) {
    return handlePostRequest(request);
}

export async function PUT(request: Request) {
    return handlePutRequest(request);
}

export async function DELETE(request: Request) {
    return handleDeleteRequest(request);
}

class ApiService {
    static async get(request: Request): Promise<NextResponse<any>> {
        return await GET(request);
    }
    static async post(request: Request): Promise<NextResponse<any>> {
        return await GET(request);
    }

    static async put(request: Request): Promise<NextResponse<any>> {
        return await GET(request);
    }
};


export default ApiService;