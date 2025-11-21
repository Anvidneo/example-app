const API_URL = 'https://authenticate-service-1042490384570.us-east1.run.app/api/v1/auth';

export interface LoginCredentials {
    username: string;
    password: string;
    projectId: string;
}

export interface LoginResponse {
    status: number;
    message: string;
    data: {
        token: string;
        expireIn: number;
        role: number;
        profile: number;
    };
    timestamp: string;
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data: LoginResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },
};
