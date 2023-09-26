import camelCase from 'lodash/camelCase';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';

// Convert snake case object keys to camelCase
export const camelize = <T extends object, K = any>(obj: T): K =>
  transform<T, K>(obj, (acc, value, key, target) => {
    const camelKey = (
      Array.isArray(target) ? key : camelCase(key as string)
    ) as keyof K;
    acc[camelKey] = (isObject(value) ? camelize(value) : value) as any;
  });
