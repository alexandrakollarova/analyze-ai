import colors from './tokens/colors.json';
import spacing from './tokens/spacing.json';
import borderRadius from './tokens/radii.json';
import font from './tokens/typography.json';
import boxShadow from './tokens/shadows.json';
import lineClamp from '@tailwindcss/line-clamp';

const preset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius,
      fontFamily: { sans: [font.fontFamily, 'sans-serif'] },
      fontSize: {
        xs: font['fontSize-xs'],
        sm: font['fontSize-sm'],
        base: font['fontSize-base'],
        lg: font['fontSize-lg'],
        xl: font['fontSize-xl'],
      },
      fontWeight: {
        normal: font['fontWeight-normal'],
        medium: font['fontWeight-medium'],
        semibold: font['fontWeight-semibold'],
        bold: font['fontWeight-bold'],
      },
      boxShadow,
    },
  },
  variants: {
    extend: {
      textColor: ['dark'], // ✅ enable dark variant for text color
      backgroundColor: ['dark'], // optional: for bg-primary etc.
    },
  },
  plugins: [lineClamp],
};

export default preset; 