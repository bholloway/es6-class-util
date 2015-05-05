/**
 * <p>Bind all methods and accessors of the given candidate to itself (in-place) and return the candidate.</p>
 * @param {object|function} candidate An instance with a prototype
 * @returns {object|function} The given candidate
 */
export default function bind(candidate) {
  var isValid = candidate && ((typeof candidate === 'object') || (typeof candidate === 'function'));
  if (isValid) {
    var current = candidate;
    var proto   = Object.getPrototypeOf(current);
    while (proto !== null) {
      copyProperties(current, candidate);
      current = proto;
      proto   = Object.getPrototypeOf(current);
    }
  }
  return candidate;
}

/**
 * Copy the enumerable members from the <code>source</code> to the <code>destination</code> while binding to the
 * <code>destination</code>.
 * @param {object} source The object on which to discover members
 * @param {object} destination The object to assign members to
 */
function copyProperties(source, destination) {
  var names = Object.getOwnPropertyNames(source);
  for (var name of names) {
    if (!destination.hasOwnProperty(name)) {
      var descriptor = bindDescriptor(Object.getOwnPropertyDescriptor(source, name), destination);
      Object.defineProperty(destination, name, descriptor);
    }
  }
}

/**
 * <p>Bind any method or accessors in the given descriptor to the given target.</p>
 * @param {object} descriptor Descriptor as returned by <code>Object.getOwnPropertyDescriptor()</code>
 * @param {object} target The object that methods will be bound to
 * @return {object} A new descriptor with bound accessors
 */
function bindDescriptor(descriptor, target) {
  var result = { };
  for (var field in descriptor) {
    result[field] = (typeof descriptor[field] === 'function') ? descriptor[field].bind(target) : descriptor[field];
  }
  return result;
}