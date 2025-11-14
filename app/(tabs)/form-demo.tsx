import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CustomButton } from '@/components/ui/custom-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, BorderRadius, Spacing } from '@/constants/app-constants';
import { useUserForm } from '@/hooks/use-user-form';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';

export default function FormDemo() {
  const router = useRouter();
  const { name, setName, email, setEmail, isValid, errors, validateForm, resetForm } = useUserForm();

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }
    
    // Navegación simple al modal existente
    router.push('/modal');
    resetForm();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={250}
          color="#FFFFFF"
          name="doc.text.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Formulario Demo 📋</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🎣 Ejemplo de Hook Personalizado</ThemedText>
        <ThemedText>
          Este formulario utiliza un <ThemedText type="defaultSemiBold">custom hook</ThemedText> para
          manejar la validación y el estado del formulario de manera reutilizable.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <ThemedText style={styles.label}>Nombre:</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#9CA3AF"
        />
        {errors.name && <ThemedText style={styles.errorText}>{errors.name}</ThemedText>}
        
        <ThemedText style={styles.label}>Email:</ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ingresa tu email"
          keyboardType="email-address"
          placeholderTextColor="#9CA3AF"
        />
        {errors.email && <ThemedText style={styles.errorText}>{errors.email}</ThemedText>}
        
        <CustomButton 
          title="Enviar Formulario" 
          onPress={handleSubmit}
          disabled={!isValid}
          fullWidth
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🔧 Componentes Reutilizables</ThemedText>
        <ThemedText>
          El botón utiliza nuestro <ThemedText type="defaultSemiBold">CustomButton</ThemedText> que
          acepta diferentes variantes y se adapta al estado del formulario.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFFFFF',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  headerEmoji: {
    fontSize: 140,
    bottom: -30,
    left: 30,
    position: 'absolute',
    opacity: 0.8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  formContainer: {
    gap: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  errorText: {
    color: AppColors.error,
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
});