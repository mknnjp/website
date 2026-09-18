// Test setup file
import { vi } from 'vitest';

// Mock Astro globals
vi.mock('astro:content', () => ({}));

// Mock astro-icon
vi.mock('astro-icon/components', () => ({
  Icon: ({ name, class: className, ...props }: any) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', className || '');
    svg.setAttribute('data-testid', `icon-${name}`);
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined) svg.setAttribute(key, String(value));
    });
    return svg;
  },
}));

// Mock environment
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
});
