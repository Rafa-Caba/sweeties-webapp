import api from '../../api/axios.api';

export interface ContactPayload {
    name: string;
    email: string;
    message: string;
    subject?: string;
}

interface ContactResponse {
    message: string;
}

export const sendContactForm = async (payload: ContactPayload): Promise<ContactResponse> => {
    // We use 'api' here because it's a simple JSON request
    const { data } = await api.post<ContactResponse>('/public/contact', payload);
    return data;
};