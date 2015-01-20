/**
 * <p>Copy the members, both values and accessors, from the <code>source</code> objects to the <code>destination</code>
 * object.</p>
 * <p>Members on the <code>destination</code>, or copied from a preceding source, are overwritten by those on a
 * following source.</p>
 * @param {object|function} destination The object whose members may be overwritten
 * @param {...object|function} sources Any number of object to copy members from
 */
export default function extend(destination, ...sources) {
  'use strict';
  var isValid = (typeof destination === 'object') || (typeof destination === 'function');
  if (isValid) {
    for (var source of sources) {
      if (source !== destination) {
        for (var name in source) {

          // find the property on the candidate or its prototype chain
          var current    = source;
          var descriptor = null;
          while (current && !(descriptor)) {
            descriptor = Object.getOwnPropertyDescriptor(current, name);
            current    = Object.getPrototypeOf(current);
          }

          // bind the descriptor and apply it to the given candidate
          Object.defineProperty(destination, name, descriptor);
        }
      }
    }
  }
}