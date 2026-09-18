import { describe, it, expect } from 'vitest';
import { TECH_STACK, getTechByCategory, getTechCategories, type TechCategory } from '../../../src/lib/tech-stack.ts';

describe('Tech Stack Data', () => {
  it('should have all required categories (non-empty)', () => {
    const categories = getTechCategories();
    expect(categories).toContain('languages');
    expect(categories).toContain('frameworksTools');
    expect(categories).toContain('infrastructures');
    // 'other' is empty so not included in getTechCategories()
  });

  it('should have languages category with 6 items', () => {
    const languages = getTechByCategory('languages');
    expect(languages).toHaveLength(6);
    expect(languages.map(l => l.label)).toEqual([
      'Bash', 'GDScript', 'Python', 'Rust', 'Swift', 'TypeScript'
    ]);
  });

  it('should have frameworksTools category with 16 items', () => {
    const frameworks = getTechByCategory('frameworksTools');
    expect(frameworks).toHaveLength(16);
  });

  it('should have infrastructures category with 6 items', () => {
    const infra = getTechByCategory('infrastructures');
    expect(infra).toHaveLength(6);
    expect(infra.map(i => i.label)).toEqual([
      'AWS', 'Docker', 'GitHub Actions', 'Postgres', 'Pulumi', 'Traefik'
    ]);
  });

  it('should have other category empty', () => {
    const other = getTechByCategory('other');
    expect(other).toHaveLength(0);
  });

  it('should have valid icon identifiers for all items', () => {
    TECH_STACK.forEach(item => {
      expect(item.icon).toMatch(/^(simple-icons:|lucide:)/);
      expect(item.label).toBeTruthy();
      expect(item.category).toMatch(/^(languages|frameworksTools|infrastructures|other)$/);
      expect(['blue', 'orange', 'green', 'purple', 'cyan', 'yellow', 'red', 'indigo', 'pink', 'gray']).toContain(item.color);
    });
  });

  it('should have unique labels', () => {
    const labels = TECH_STACK.map(item => item.label);
    const uniqueLabels = new Set(labels);
    expect(labels.length).toBe(uniqueLabels.size);
  });
});
