import React from 'react';
import {TouchableOpacity, Text, TouchableOpacityProps} from 'react-native';
import {styled} from 'nativewind';
import {cva, type VariantProps} from 'class-variance-authority';

const buttonVariants = cva(
  'justify-center items-center rounded-xl px-5 py-3 font-semibold text-white disabled:bg-neutral-200',
  {
    variants: {
      variant: {
        default: 'bg-yoi-500',
        outline: 'bg-white border-2 border-yoi-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  title?: string;
  className?: string;
}

const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);

const Button = ({
  variant = 'default',
  title,
  className = '',
  ...props
}: ButtonProps) => {
  const baseButtonStyle = buttonVariants({variant});

  const textColorClass = variant === 'outline' ? 'text-black' : 'text-white';

  return (
    <StyledTouchable className={`${baseButtonStyle} ${className}`} {...props}>
      <StyledText className={`text-base font-semibold ${textColorClass}`}>
        {title}
      </StyledText>
    </StyledTouchable>
  );
};

export default Button;
