import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CustomButton } from '@/components/ui/custom-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, Spacing } from '@/constants/app-constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';

export default function NavigationDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const showBackExample = () => {
    Alert.alert(
      'Navegación Hacia Atrás',
      'Presiona "Volver" para ver router.back() in acción',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Volver', onPress: () => router.back() }
      ]
    );
  };

  const showReplaceExample = () => {
    Alert.alert(
      'Navegación con Replace',
      '¿Quieres reemplazar esta pantalla con el Home?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reemplazar', onPress: () => router.replace('/') }
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F4F8', dark: '#2A4A52' }}
      headerImage={
        <IconSymbol
          size={250}
          color="#4A90A4"
          name="arrow.triangle.branch"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Detalle Navegación 📍</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">¡Navegación Exitosa! 🎉</ThemedText>
        <ThemedText>
          Has navegado correctamente a esta pantalla usando{' '}
          <ThemedText type="defaultSemiBold">router.push()</ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.paramContainer}>
        <ThemedText type="subtitle">Parámetros Recibidos:</ThemedText>
        <ThemedText>
          Origen: <ThemedText type="defaultSemiBold">{params.from || 'No especificado'}</ThemedText>
        </ThemedText>
        <ThemedText>
          Método: <ThemedText type="defaultSemiBold">{params.method || 'push'}</ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <CustomButton
          title="← Volver (router.back)"
          onPress={showBackExample}
          variant="outline"
          fullWidth
        />
        
        <CustomButton
          title="Reemplazar con Home"
          onPress={showReplaceExample}
          variant="secondary"
          fullWidth
        />
        
        <CustomButton
          title="Ir al Formulario"
          onPress={() => router.push('/form-demo')}
          fullWidth
        />
      </ThemedView>

      <ThemedView style={styles.infoCard}>
        <ThemedText type="subtitle">💡 Conceptos Aprendidos</ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">router.push()</ThemedText> - Agrega nueva pantalla al stack{'\n'}
          • <ThemedText type="defaultSemiBold">router.back()</ThemedText> - Regresa a pantalla anterior{'\n'}
          • <ThemedText type="defaultSemiBold">router.replace()</ThemedText> - Reemplaza pantalla actual{'\n'}
          • <ThemedText type="defaultSemiBold">useLocalSearchParams()</ThemedText> - Accede a parámetros de URL
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#4A90A4',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  paramContainer: {
    gap: 8,
    marginBottom: 20,
    padding: Spacing.lg,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.success,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 20,
  },
  infoCard: {
    gap: 12,
    marginTop: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: AppColors.primary,
    backgroundColor: '#F0F8FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});