/**
 * <p>Copy the members, both values and accessors, from the <code>source</code> objects to the <code>destination</code>
 * object.</p>
 * <p>Members on the <code>destination</code>, or copied from a preceding source, are overwritten by those on a
 * following source.</p>
 * @param {object|function} destination The object whose members may be overwritten
 * @param {...object|function} sources Any number of object to copy members from
 */
export default function extend(destination, ...sources) {
  var isValid = destination && ((typeof destination === 'object') || (typeof destination === 'function'));
  if (isValid) {
    for (var source of sources) {
      isValid = source && (source !== destination) && ((typeof source === 'object') || (typeof source === 'function'));
      if (isValid) {
        var current = source;
        var proto   = Object.getPrototypeOf(current);
        while (proto !== null) {
          copyProperties(current, destination);
          current = proto;
          proto   = Object.getPrototypeOf(current);
        }
      }
    }
  }
}

/**
 * Copy the enumerable members from the <code>source</code> to the <code>destination</code>.
 * @param {object} source The object on which to discover members
 * @param {object} destination The object to assign members to
 */
function copyProperties(source, destination) {
  var names = Object.getOwnPropertyNames(source);
  for (var name of names) {
    if (!destination.hasOwnProperty(name)) {
      var descriptor = Object.getOwnPropertyDescriptor(source, name);
      Object.defineProperty(destination, name, descriptor);
    }
  }
}
