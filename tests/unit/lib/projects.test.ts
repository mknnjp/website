import { describe, it, expect } from 'vitest';
import { PROJECTS } from '../../../src/lib/projects.ts';
import type { BadgeColor } from '../../../src/lib/badge-colors.ts';

describe('Projects Data', () => {
  it('should have 3 projects', () => {
    expect(PROJECTS).toHaveLength(3);
  });

  it('should have valid project structure', () => {
    PROJECTS.forEach(project => {
      expect(project.name).toBeTruthy();
      expect(project.language).toBeTruthy();
      expect(project.languageColor).toMatch(/^(blue|orange|green|purple|cyan|yellow|red|indigo|pink|gray)$/);
      expect(project.descriptionKey).toBeTruthy();
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\//);
      if (project.stars !== undefined) {
        expect(typeof project.stars).toBe('number');
        expect(project.stars).toBeGreaterThanOrEqual(0);
      }
      if (project.forks !== undefined) {
        expect(typeof project.forks).toBe('number');
        expect(project.forks).toBeGreaterThanOrEqual(0);
      }
      if (project.inDevelopment !== undefined) {
        expect(typeof project.inDevelopment).toBe('boolean');
      }
    });
  });

  it('should have correct project names', () => {
    const names = PROJECTS.map(p => p.name);
    expect(names).toEqual(['utopia', 'xiangke', 'pr-agent-runner']);
  });

  it('should have correct languages', () => {
    const languages = PROJECTS.map(p => p.language);
    expect(languages).toEqual(['Rust', 'Rust', 'TypeScript']);
  });

  it('should have correct language colors', () => {
    const colors = PROJECTS.map(p => p.languageColor);
    expect(colors).toEqual(['orange', 'orange', 'blue']);
  });

  it('should have unique names', () => {
    const names = PROJECTS.map(p => p.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });

  it('should have valid BadgeColor type', () => {
    const validColors: BadgeColor[] = [
      'blue', 'orange', 'green', 'purple', 'cyan',
      'yellow', 'red', 'indigo', 'pink', 'gray'
    ];
    PROJECTS.forEach(project => {
      expect(validColors).toContain(project.languageColor);
    });
  });
});
