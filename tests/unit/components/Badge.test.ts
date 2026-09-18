import { describe, it, expect } from 'vitest';
import { BADGE_COLORS, BADGE_SIZES, type BadgeColor, type BadgeSize } from '../../../src/lib/badge-colors.ts';

describe('Badge Colors & Sizes', () => {
  it('should have all 10 color variants', () => {
    const colors: BadgeColor[] = [
      'blue', 'orange', 'green', 'purple', 'cyan',
      'yellow', 'red', 'indigo', 'pink', 'gray'
    ];
    colors.forEach(color => {
      expect(BADGE_COLORS[color]).toBeTruthy();
      expect(BADGE_COLORS[color]).toContain('bg-');
      expect(BADGE_COLORS[color]).toContain('dark:');
    });
  });

  it('should have both size variants', () => {
    const sizes: BadgeSize[] = ['sm', 'md'];
    sizes.forEach(size => {
      expect(BADGE_SIZES[size]).toBeTruthy();
      expect(BADGE_SIZES[size]).toContain('px-');
      expect(BADGE_SIZES[size]).toContain('py-');
    });
  });

  it('should have correct size classes', () => {
    expect(BADGE_SIZES.sm).toBe('px-2 py-1 text-xs font-medium rounded');
    expect(BADGE_SIZES.md).toBe('px-4 py-2 rounded-lg font-medium');
  });

  it('should have dark mode variants for all colors', () => {
    Object.values(BADGE_COLORS).forEach(cls => {
      expect(cls).toContain('dark:');
    });
  });
});
