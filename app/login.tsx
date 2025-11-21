import { useAuth } from '@/context/AuthContext';
import { authService, LoginCredentials } from '@/services/auth.service';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('DominaAdmin2025**');
  const [projectId, setProjectId] = useState('API_MOP_0002');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password || !projectId) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
    }

    setLoading(true);
    try {
        const credentials: LoginCredentials = {
            username,
            password,
            projectId,
        };

        const response = await authService.login(credentials);

        if (response.status === 201) {
            // Guardar datos de autenticación en el contexto
            await login(response.data);
            Alert.alert(
                'Éxito',
                `Login exitoso!\nRole: ${response.data.role}\nProfile: ${response.data.profile}`,
                [
                    { 
                        text: 'OK', 
                        onPress: () => router.replace('/(tabs)') 
                    }
                ]
            );
            console.log('Login response:', response);
        }
    } catch (error) {
        Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus credenciales.');
        console.error('Login error:', error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <View style={styles.content}>
            <Text style={styles.title}>Bridge a Cloud</Text>
            <Text style={styles.subtitle}>APIs y Autenticación</Text>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Ingresa tu usuario"
                        autoCapitalize="none"
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Ingresa tu contraseña"
                        secureTextEntry
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Project ID</Text>
                    <TextInput
                        style={styles.input}
                        value={projectId}
                        onChangeText={setProjectId}
                        placeholder="Ingresa el ID del proyecto"
                        autoCapitalize="characters"
                        editable={!loading}
                    />
                </View>

                <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.info}>
                <Text style={styles.infoText}>
                Esta app demuestra la integración con APIs externas y manejo de autenticación.
                </Text>
            </View>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    info: {
        marginTop: 30,
        padding: 16,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#1976d2',
        textAlign: 'center',
        lineHeight: 20,
    },
});
