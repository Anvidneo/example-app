import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/app-constants';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  fullWidth?: boolean;
}

export function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  fullWidth = false 
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth
      ]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text,
        variant === 'outline' && !disabled && styles.textOutline
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    width: undefined,
  },
  primary: {
    backgroundColor: AppColors.primary,
  },
  secondary: {
    backgroundColor: AppColors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: AppColors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    backgroundColor: AppColors.gray[400],
    opacity: 0.7,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: 'white',
  },
  textOutline: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: AppColors.primary,
  },
});