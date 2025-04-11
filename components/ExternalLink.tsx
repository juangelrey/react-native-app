import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';

type Props = Omit<ComponentProps<typeof Pressable>, 'onPress' | 'style'> & { 
  href: string;
  children: React.ReactNode;
  style?: TextStyle;
  containerStyle?: ViewStyle;
};

export function ExternalLink({ href, children, style, containerStyle, ...rest }: Props) {
  return (
    <Pressable
      {...rest}
      style={containerStyle}
      onPress={async () => {
        if (Platform.OS !== 'web') {
          // Open the link in an in-app browser on native platforms
          await openBrowserAsync(href);
        } else {
          // Open in new tab on web
          window.open(href, '_blank');
        }
      }}
    >
      <Text style={style}>{children}</Text>
    </Pressable>
  );
}
