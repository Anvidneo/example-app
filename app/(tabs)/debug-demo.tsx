import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DebugDemoScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [counter, setCounter] = useState(0);

  // 🎯 DEMO 1: Error de Objeto Null/Undefined
  const simulateNullError = () => {
    console.log('🔍 DEMO 1: Null/Undefined Error');
    console.log('Current user:', user);
    
    try {
      // Esto va a fallar porque user es null
      const userName = user!.name.toUpperCase();
      console.log('User name:', userName);
    } catch (error) {
      console.error('🚨 Caught null reference error:', error);
      Alert.alert('Error', 'Usuario no definido - Revisar console');
    }
  };

  // 🎯 DEMO 2: Error de Network/API
  const simulateNetworkError = async () => {
    console.log('🔍 DEMO 2: Network Error Simulation');
    setLoading(true);
    
    try {
      // URL que va a fallar intencionalmente
      console.log('🌐 Making API request to invalid URL...');
      const response = await fetch('https://jsonplaceholder-fake-url.com/users');
      
      console.log('🌐 Response status:', response.status);
      console.log('🌐 Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUsers(data);
      console.log('✅ Data received:', data);
      
    } catch (error) {
      console.error('🚨 Network error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        type: typeof error,
        stack: error instanceof Error ? error.stack : undefined
      });
      Alert.alert('Network Error', 'Revisar Network tab en DevTools');
    } finally {
      setLoading(false);
      console.log('🏁 Request completed, loading:', false);
    }
  };

  // 🎯 DEMO 3: API Exitosa (para contrastar)
  const simulateSuccessfulAPI = async () => {
    console.log('🔍 DEMO 3: Successful API Call');
    setLoading(true);
    
    try {
      console.log('🌐 Making API request to valid URL...');
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
      
      console.log('🌐 Response status:', response.status);
      console.log('🌐 Response headers:', Object.fromEntries(response.headers));
      
      const data = await response.json();
      console.log('✅ API Response data:', data);
      
      setUsers(data);
      setUser(data[0]);
      
    } catch (error) {
      console.error('🚨 Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 DEMO 4: Error de Estado (State Issues)
  const simulateStateError = () => {
    console.log('🔍 DEMO 4: State Update Issues');
    
    // ❌ Forma incorrecta - mostrará valor anterior
    console.log('❌ Counter before incorrect update:', counter);
    setCounter(counter + 1);
    console.log('❌ Counter after incorrect update (shows old value):', counter);
    
    // ✅ Forma correcta - con callback
    setCounter(prevCounter => {
      console.log('✅ Previous counter value:', prevCounter);
      const newValue = prevCounter + 1;
      console.log('✅ New counter value:', newValue);
      return newValue;
    });
  };

  // 🎯 DEMO 5: Error de Renderizado Infinito
  const [renderCount, setRenderCount] = useState(0);
  
  // ❌ Esto causaría un loop infinito si no está comentado
  // useEffect(() => {
  //   console.log('🔄 Infinite render loop!');
  //   setRenderCount(renderCount + 1);
  // });

  // ✅ Versión correcta con dependencias
  useEffect(() => {
    console.log('✅ Component mounted or counter changed');
    setRenderCount(prev => prev + 1);
  }, [counter]); // Dependencia específica

  // 🎯 DEMO 6: Performance Debug
  const simulateHeavyOperation = () => {
    console.log('🔍 DEMO 6: Performance Debugging');
    console.time('⏱️ Heavy operation duration');
    
    // Simulamos operación pesada
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    
    console.timeEnd('⏱️ Heavy operation duration');
    console.log('🎯 Operation result:', result);
    
    Alert.alert('Performance', 'Operación completada - revisar tiempo en console');
  };

  // Debug de props y componente
  console.log('🔄 DebugDemo Component Render', {
    timestamp: new Date().toISOString(),
    state: { user, users: users.length, loading, counter, renderCount }
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ff4444', dark: '#cc3333' }}
      headerImage={
        <IconSymbol
          size={310}
          color="rgba(255,255,255,0.3)"
          name="ladybug.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">🐛 Debug Demo</ThemedText>
      </ThemedView>

      {/* DevTools Instructions */}
      <ThemedView style={styles.devToolsContainer}>
        <ThemedText style={styles.devToolsTitle}>🛠️ Abrir DevTools:</ThemedText>
        
        <ThemedView style={styles.shortcutsContainer}>
          <ThemedView style={styles.shortcutCard}>
            <ThemedText style={styles.shortcutPlatform}>🍎 Mac</ThemedText>
            <ThemedText style={styles.shortcutKey}>⌘ + ⌥ + I</ThemedText>
            <ThemedText style={styles.shortcutDesc}>Chrome DevTools</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.shortcutCard}>
            <ThemedText style={styles.shortcutPlatform}>🪟 Windows</ThemedText>
            <ThemedText style={styles.shortcutKey}>F12</ThemedText>
            <ThemedText style={styles.shortcutDesc}>Chrome DevTools</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.shortcutCard}>
            <ThemedText style={styles.shortcutPlatform}>📱 iOS</ThemedText>
            <ThemedText style={styles.shortcutKey}>⌘ + D</ThemedText>
            <ThemedText style={styles.shortcutDesc}>Dev Menu</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.shortcutCard}>
            <ThemedText style={styles.shortcutPlatform}>🤖 Android</ThemedText>
            <ThemedText style={styles.shortcutKey}>Ctrl + M</ThemedText>
            <ThemedText style={styles.shortcutDesc}>Dev Menu</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.statusContainer}>
        <ThemedText style={styles.statusTitle}>📊 Current State:</ThemedText>
        <ThemedText style={styles.statusText}>User: {user ? user.name : 'null'}</ThemedText>
        <ThemedText style={styles.statusText}>Users loaded: {users.length}</ThemedText>
        <ThemedText style={styles.statusText}>Counter: {counter}</ThemedText>
        <ThemedText style={styles.statusText}>Renders: {renderCount}</ThemedText>
        <ThemedText style={styles.statusText}>Loading: {loading.toString()}</ThemedText>
      </ThemedView>

        {/* Demo Buttons */}
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.errorButton]} 
            onPress={simulateNullError}
          >
            <Text style={styles.buttonText}>🚨 Error: Null Reference</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.errorButton]} 
            onPress={simulateNetworkError}
          >
            <Text style={styles.buttonText}>
              {loading ? '⏳ Loading...' : '🌐 Error: Network Fail'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.successButton]} 
            onPress={simulateSuccessfulAPI}
          >
            <Text style={styles.buttonText}>
              {loading ? '⏳ Loading...' : '✅ Success: API Call'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.warningButton]} 
            onPress={simulateStateError}
          >
            <Text style={styles.buttonText}>⚠️ State Update Issue</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.infoButton]} 
            onPress={simulateHeavyOperation}
          >
            <Text style={styles.buttonText}>⏱️ Performance Test</Text>
          </TouchableOpacity>
        </ThemedView>

        {/* Input Demo */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>🔍 Debug Input Changes:</ThemedText>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={(text) => {
              console.log('📝 Input changed:', {
                previous: inputText,
                new: text,
                length: text.length
              });
              setInputText(text);
            }}
            placeholder="Escribe algo y revisa la console..."
            placeholderTextColor="#999"
          />
        </ThemedView>

        {/* Users Display */}
        {users.length > 0 && (
          <ThemedView style={styles.usersContainer}>
            <ThemedText style={styles.usersTitle}>👥 Loaded Users:</ThemedText>
            {users.map((u, index) => (
              <TouchableOpacity 
                key={u.id}
                style={styles.userItem}
                onPress={() => {
                  console.log('👤 User selected:', u);
                  setUser(u);
                }}
              >
                <ThemedText style={styles.userName}>{u.name}</ThemedText>
                <ThemedText style={styles.userEmail}>{u.email}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        )}

        {/* Debug Instructions */}
        <ThemedView style={styles.instructionsContainer}>
          <ThemedText style={styles.instructionsTitle}>🎯 Como Debuggear:</ThemedText>
          <ThemedText style={styles.instruction}>1. Abrir Chrome DevTools (F12)</ThemedText>
          <ThemedText style={styles.instruction}>2. Ir a Console tab</ThemedText>
          <ThemedText style={styles.instruction}>3. Ir a Network tab (para APIs)</ThemedText>
          <ThemedText style={styles.instruction}>4. Presionar botones y observar logs</ThemedText>
          <ThemedText style={styles.instruction}>5. En Expo: Shake → Debug Remote JS</ThemedText>
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: 'rgba(255,255,255,0.3)',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  statusContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorButton: {
    backgroundColor: '#ff4444',
  },
  successButton: {
    backgroundColor: '#00C851',
  },
  warningButton: {
    backgroundColor: '#ffbb33',
  },
  infoButton: {
    backgroundColor: '#33b5e5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  usersContainer: {
    marginBottom: 20,
  },
  usersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  userItem: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  instructionsContainer: {
    backgroundColor: 'rgba(51, 181, 229, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 6,
  },
  // DevTools section styles
  devToolsContainer: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.2)',
  },
  devToolsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  shortcutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  shortcutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  shortcutPlatform: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  shortcutKey: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 4,
    textAlign: 'center',
  },
  shortcutDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});