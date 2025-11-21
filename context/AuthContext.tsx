import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthData {
    token: string;
    username: string;
    expireIn: number;
    role: number;
    profile: number;
}

interface AuthContextType {
    authData: AuthData | null;
    isAuthenticated: boolean;
    login: (data: AuthData) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    authData: null,
    isAuthenticated: false,
    login: async () => {},
    logout: async () => {},
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const authDataSerialized = await AsyncStorage.getItem('@AuthData');
            if (authDataSerialized) {
                const _authData: AuthData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
            }
        } catch (error) {
            console.error('Error loading auth data:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: AuthData) => {
        setAuthData(data);
        await AsyncStorage.setItem('@AuthData', JSON.stringify(data));
    };

    const logout = async () => {
        setAuthData(null);
        await AsyncStorage.removeItem('@AuthData');
    };

    return (
        <AuthContext.Provider
            value={{
                authData,
                isAuthenticated: !!authData,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
