import { ContainerSize } from '@/types';

export function generateRandomId() {
  return `_${Math.random().toString(36).slice(2, 16)}`;
}

export function getSizeStyles(size?: ContainerSize) {
  if (!size) return '';

  if (size === 'full-width') {
    return `
      width: 100%;
      height: auto;
    `;
  }

  return `
    width: ${size.width};
    height: ${size.height};
  `;
}

export function isJwtToken(str?: string) {
  if (!str) return false;

  const split = str.split('.');

  return split.length === 3;
}

export function hasKey(list: Object) {
  return Object.keys(list).length !== 0;
}

export function isEmptyList(list: any[]) {
  return Array.isArray(list) && list.length === 0;
}

export function throttle(fn: (...args: any) => any, delay: number) {
  let waiting = false;

  function closure(this: any, ...args: any[]) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, delay);
    }
  }

  return closure;
}

export function isNumericString(value?: string | null) {
  if (!value) return false;

  return /^\d+$/.test(value);
}

export function isEmptyString(value?: string | null) {
  if (!value) return true;

  return value === '';
}
