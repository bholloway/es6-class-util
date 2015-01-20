/**
 * <p>Bind all methods and accessors of the given candidate to itself (in-place) and return the candidate.</p>
 * @param {object|function} candidate An instance with a prototype
 * @returns {object|function} The given candidate
 */
export default function bind(candidate) {
  'use strict';
  var isValid = (typeof candidate === 'object') || (typeof candidate === 'function');
  if (isValid) {
    for (var name in candidate) {

      // find the property on the candidate or its prototype chain
      var current    = candidate;
      var descriptor = null;
      while (current && !(descriptor)) {
        descriptor = Object.getOwnPropertyDescriptor(current, name);
        current    = Object.getPrototypeOf(current);
      }

      // bind the descriptor and apply it to the given candidate
      Object.defineProperty(candidate, name, bindDescriptor(descriptor, candidate));
    }
  }
  return candidate;
}

/**
 * <p>Bind any method or accessors in the given descriptor to the given target.</p>
 * @param {object} descriptor Descriptor as returned by <code>Object.getOwnPropertyDescriptor()</code>
 * @param {object} target The object that methods will be bound to
 * @return {object} A new descriptor with bound accessors
 */
function bindDescriptor(descriptor, target) {
  'use strict';
  var result = { };
  for (var field in descriptor) {
    result[field] = (typeof descriptor[field] === 'function') ? descriptor[field].bind(target) : descriptor[field];
  }
  return result;
}