export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface Product {
    name: string;
    category: string;
    description: string;
}

export interface Service {
    title: string;
    description: string;
}
