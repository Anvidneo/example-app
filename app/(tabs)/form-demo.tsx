import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import {
    ActionSheetIOS,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  country: string;
  isSubscribed: boolean;
  comments: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: string;
  country?: string;
}

export default function FormDemoScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    country: '',
    isSubscribed: false,
    comments: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🎯 DEMO: Actualizar campo individual
  const updateField = (field: keyof FormData, value: string | boolean) => {
    console.log(`📝 Updating ${field}:`, value);
    
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      console.log('📊 Form state updated:', updated);
      return updated;
    });

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => {
        const updatedErrors = { ...prev };
        delete updatedErrors[field as keyof ValidationErrors];
        console.log('✨ Error cleared for:', field);
        return updatedErrors;
      });
    }
  };

  // 🎯 DEMO: Selector de país nativo
  const showCountryPicker = () => {
    const countries = [
      { label: 'Selecciona un país', value: '' },
      { label: '🇦🇷 Argentina', value: 'argentina' },
      { label: '🇧🇷 Brasil', value: 'brasil' },
      { label: '🇨🇱 Chile', value: 'chile' },
      { label: '🇨🇴 Colombia', value: 'colombia' },
      { label: '🇪🇸 España', value: 'españa' },
      { label: '🇲🇽 México', value: 'mexico' },
      { label: '🇵🇪 Perú', value: 'peru' },
      { label: '🇺🇸 Estados Unidos', value: 'usa' },
    ];

    if (Platform.OS === 'ios') {
      // Usar ActionSheet nativo en iOS
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancelar', ...countries.slice(1).map(c => c.label)], // Skip first option and add Cancel
          cancelButtonIndex: 0,
          title: 'Selecciona tu país',
        },
        (buttonIndex) => {
          if (buttonIndex > 0) {
            const selectedCountry = countries[buttonIndex];
            updateField('country', selectedCountry.value);
            console.log('🌍 Country selected via ActionSheet:', selectedCountry);
          }
        }
      );
    } else {
      // Usar Alert con botones en Android/Web
      const buttons = countries.map((country) => ({
        text: country.label,
        onPress: () => {
          updateField('country', country.value);
          console.log('🌍 Country selected via Alert:', country);
        },
      }));

      // Agregar botón cancelar
      buttons.push({
        text: 'Cancelar',
        onPress: () => console.log('🚫 Country selection cancelled'),
      });

      Alert.alert('Selecciona tu país', undefined, buttons, { cancelable: true });
    }
  };

  // 🎯 DEMO: Validación en tiempo real
  const validateField = (field: keyof FormData, value: string): string | null => {
    console.log(`🔍 Validating ${field} with value:`, value);

    switch (field) {
      case 'name':
        if (!value.trim()) return 'El nombre es requerido';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        break;

      case 'email':
        if (!value.trim()) return 'El email es requerido';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
        break;

      case 'password':
        if (!value) return 'La contraseña es requerida';
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) return 'La contraseña debe contener letras y números';
        break;

      case 'confirmPassword':
        if (!value) return 'Confirma tu contraseña';
        if (value !== formData.password) return 'Las contraseñas no coinciden';
        break;

      case 'age':
        if (!value.trim()) return 'La edad es requerida';
        const age = parseInt(value);
        if (isNaN(age) || age < 1 || age > 120) return 'Edad inválida (1-120)';
        break;

      case 'country':
        if (!value) return 'Selecciona un país';
        break;

      default:
        return null;
    }
    return null;
  };

  // 🎯 DEMO: Validación completa del formulario
  const validateForm = (): boolean => {
    console.log('🔍 Validating entire form...');
    console.log('📋 Current form data:', formData);
    
    const newErrors: ValidationErrors = {};
    
    // Validar todos los campos
    Object.keys(formData).forEach(key => {
      if (key !== 'isSubscribed' && key !== 'comments') {
        const error = validateField(key as keyof FormData, formData[key as keyof FormData] as string);
        if (error) {
          newErrors[key as keyof ValidationErrors] = error;
        }
      }
    });

    setErrors(newErrors);
    console.log('❌ Validation errors:', newErrors);
    
    const isValid = Object.keys(newErrors).length === 0;
    console.log('✅ Form is valid:', isValid);
    
    return isValid;
  };

  // 🎯 DEMO: Envío del formulario
  const handleSubmit = async () => {
    console.log('🚀 Form submission started');
    console.time('⏱️ Form submission duration');

    if (!validateForm()) {
      console.log('❌ Form validation failed');
      Alert.alert('Error', 'Por favor corrige los errores antes de continuar');
      return;
    }

    setIsSubmitting(true);
    console.log('📤 Submitting form data:', formData);

    try {
      // Simulamos una llamada API
      console.log('🌐 Sending data to API...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('✅ Form submitted successfully');
      console.timeEnd('⏱️ Form submission duration');
      
      Alert.alert(
        'Éxito', 
        'Formulario enviado correctamente',
        [{ text: 'OK', onPress: resetForm }]
      );

    } catch (error) {
      console.error('🚨 Form submission error:', error);
      Alert.alert('Error', 'No se pudo enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🎯 DEMO: Resetear formulario
  const resetForm = () => {
    console.log('🔄 Resetting form...');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      country: '',
      isSubscribed: false,
      comments: '',
    });
    setErrors({});
    console.log('✨ Form reset completed');
  };

  // 🎯 DEMO: Validación al perder foco
  const handleBlur = (field: keyof FormData) => {
    const value = formData[field];
    console.log(`👁️ Field ${field} lost focus with value:`, value);
    
    if (field !== 'isSubscribed' && field !== 'comments') {
      const error = validateField(field, value as string);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
        console.log(`❌ Validation error for ${field}:`, error);
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4CAF50', dark: '#2E7D32' }}
      headerImage={
        <IconSymbol
          size={310}
          color="rgba(255,255,255,0.3)"
          name="doc.text.fill"
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">📝 Form Demo</ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Aprende a manejar formularios en React Native
      </ThemedText>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {/* Nombre */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedText style={styles.label}>👤 Nombre Completo *</ThemedText>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
            onBlur={() => handleBlur('name')}
            placeholder="Ingresa tu nombre completo"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoComplete="name"
          />
          {errors.name && <ThemedText style={styles.errorText}>{errors.name}</ThemedText>}
        </ThemedView>

        {/* Email */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedText style={styles.label}>📧 Email *</ThemedText>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            onBlur={() => handleBlur('email')}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {errors.email && <ThemedText style={styles.errorText}>{errors.email}</ThemedText>}
        </ThemedView>

        {/* Contraseña */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedText style={styles.label}>🔒 Contraseña *</ThemedText>
          <ThemedView style={styles.passwordContainer}>
            <TextInput
              style={[styles.passwordInput, errors.password && styles.inputError]}
              value={formData.password}
              onChangeText={(text) => updateField('password', text)}
              onBlur={() => handleBlur('password')}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              autoComplete="new-password"
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => {
                setShowPassword(!showPassword);
                console.log('👁️ Password visibility toggled:', !showPassword);
              }}
            >
              <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </ThemedView>
          {errors.password && <ThemedText style={styles.errorText}>{errors.password}</ThemedText>}
        </ThemedView>

        {/* Confirmar Contraseña */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedText style={styles.label}>🔐 Confirmar Contraseña *</ThemedText>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            onBlur={() => handleBlur('confirmPassword')}
            placeholder="Repite tu contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            autoComplete="new-password"
          />
          {errors.confirmPassword && <ThemedText style={styles.errorText}>{errors.confirmPassword}</ThemedText>}
        </ThemedView>

        {/* Edad */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedText style={styles.label}>🎂 Edad *</ThemedText>
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            value={formData.age}
            onChangeText={(text) => updateField('age', text)}
            onBlur={() => handleBlur('age')}
            placeholder="Ingresa tu edad"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={3}
          />
          {errors.age && <ThemedText style={styles.errorText}>{errors.age}</ThemedText>}
        </ThemedView>

        {/* País */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedText style={styles.label}>🌍 País *</ThemedText>
          <TouchableOpacity 
            style={[styles.countrySelector, errors.country && styles.inputError]}
            onPress={showCountryPicker}
          >
            <Text style={styles.countrySelectorText}>
              {formData.country === '' && 'Selecciona un país'}
              {formData.country === 'argentina' && '🇦🇷 Argentina'}
              {formData.country === 'brasil' && '🇧🇷 Brasil'}
              {formData.country === 'chile' && '🇨🇱 Chile'}
              {formData.country === 'colombia' && '🇨🇴 Colombia'}
              {formData.country === 'españa' && '🇪🇸 España'}
              {formData.country === 'mexico' && '🇲🇽 México'}
              {formData.country === 'peru' && '🇵🇪 Perú'}
              {formData.country === 'usa' && '🇺🇸 Estados Unidos'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {errors.country && <ThemedText style={styles.errorText}>{errors.country}</ThemedText>}
        </ThemedView>

        {/* Switch */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedView style={styles.switchRow}>
            <ThemedText style={styles.label}>📬 Suscribirse a newsletter</ThemedText>
            <Switch
              value={formData.isSubscribed}
              onValueChange={(value) => {
                updateField('isSubscribed', value);
                console.log('📬 Newsletter subscription:', value);
              }}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={formData.isSubscribed ? '#fff' : '#f4f3f4'}
            />
          </ThemedView>
        </ThemedView>

        {/* Comentarios */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedText style={styles.label}>💭 Comentarios (opcional)</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.comments}
            onChangeText={(text) => updateField('comments', text)}
            placeholder="Escribe tus comentarios aquí..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </ThemedView>

        {/* Estado del formulario */}
        <ThemedView style={styles.debugContainer}>
          <ThemedText style={styles.debugTitle}>🔍 Estado del Formulario:</ThemedText>
          <ThemedText style={styles.debugText}>
            Campos válidos: {Object.keys(errors).length === 0 ? '✅' : '❌'}
          </ThemedText>
          <ThemedText style={styles.debugText}>
            Errores: {Object.keys(errors).length}
          </ThemedText>
          <ThemedText style={styles.debugText}>
            Enviando: {isSubmitting ? 'Sí' : 'No'}
          </ThemedText>
        </ThemedView>

        {/* Botones */}
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? '⏳ Enviando...' : '🚀 Enviar Formulario'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetForm}
          >
            <Text style={styles.buttonText}>🔄 Limpiar Formulario</Text>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
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
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  keyboardAvoid: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 24,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  eyeText: {
    fontSize: 20,
  },
  countrySelector: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
  },
  countrySelectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  debugContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#757575',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});