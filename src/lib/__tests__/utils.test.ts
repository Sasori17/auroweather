import { cn } from '../utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-2 py-1', 'bg-red-500');
      expect(result).toBe('px-2 py-1 bg-red-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class active-class');
    });

    it('should remove falsy values', () => {
      const result = cn('base-class', false && 'hidden', null, undefined, 'visible');
      expect(result).toBe('base-class visible');
    });

    it('should merge conflicting Tailwind classes', () => {
      // twMerge should keep the last class when there are conflicts
      const result = cn('px-2', 'px-4');
      expect(result).toBe('px-4');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['px-2', 'py-1'], 'bg-blue-500');
      expect(result).toBe('px-2 py-1 bg-blue-500');
    });

    it('should handle objects with conditional classes', () => {
      const result = cn({
        'base-class': true,
        'conditional-class': true,
        'hidden-class': false,
      });
      expect(result).toBe('base-class conditional-class');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle complex combinations', () => {
      const result = cn(
        'base-class',
        { 'conditional-1': true, 'conditional-2': false },
        ['array-class-1', 'array-class-2'],
        'final-class'
      );
      expect(result).toContain('base-class');
      expect(result).toContain('conditional-1');
      expect(result).toContain('array-class-1');
      expect(result).toContain('final-class');
      expect(result).not.toContain('conditional-2');
    });
  });
});
