import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CustomButton } from '@/components/ui/custom-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, Spacing } from '@/constants/app-constants';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NavigationDemo() {
  const router = useRouter();
  const borderColor = useThemeColor({ light: '#E5E7EB', dark: '#374151' }, 'text');

  const navigationExamples = [
    {
      title: 'Navegación con Push',
      description: 'Ir a nueva pantalla con parámetros',
      action: () => router.push('/navigation-detail?from=navigation-demo&method=push'),
    },
    {
      title: 'Ir al Formulario',
      description: 'Navegar al tab de formulario',
      action: () => router.push('/form-demo'),
    },
    {
      title: 'Abrir Modal',
      description: 'Abrir pantalla modal (usa stack navigation)',
      action: () => router.push('/modal'),
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="arrow.triangle.swap"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Navegación 🚀</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Expo Router</ThemedText>
        <ThemedText>
          Aprende los diferentes métodos de navegación disponibles en{' '}
          <ThemedText type="defaultSemiBold">Expo Router</ThemedText> con ejemplos prácticos.
        </ThemedText>
      </ThemedView>
      
      {navigationExamples.map((example, index) => (
        <ThemedView 
          key={index} 
          style={[styles.exampleCard, { borderColor }]}
          lightColor="#FFFFFF"
          darkColor="#1F2937"
        >
          <ThemedText type="subtitle">{example.title}</ThemedText>
          <ThemedText style={styles.exampleDescription}>{example.description}</ThemedText>
          <CustomButton
            title="Probar"
            onPress={example.action}
          />
        </ThemedView>
      ))}
      
      <ThemedView 
        style={styles.infoCard}
        lightColor="#F0F8FF"
        darkColor="#1E3A5F"
      >
        <ThemedText type="subtitle">💡 Conceptos Clave</ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">router.push()</ThemedText> - Navega a una nueva pantalla{'\n'}
          • <ThemedText type="defaultSemiBold">router.back()</ThemedText> - Vuelve a la pantalla anterior{'\n'}
          • <ThemedText type="defaultSemiBold">router.replace()</ThemedText> - Reemplaza la pantalla actual{'\n'}
          • Expo Router usa file-based routing{'\n'}
          • Los parámetros se pueden pasar via query strings o params
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
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
  exampleCard: {
    gap: 12,
    marginBottom: 20,
    padding: Spacing.xl,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleDescription: {
    fontSize: 15,
    color: AppColors.gray[500],
    lineHeight: 20,
  },
  infoCard: {
    gap: 12,
    marginTop: Spacing.xl,
    padding: Spacing.xl,
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: AppColors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});