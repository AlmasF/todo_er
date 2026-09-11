// Source - https://stackoverflow.com/a/384380
// Posted by some, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-07, License - CC BY-SA 3.0

export function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    console.error('isElement: ', e);
    return (
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.style === 'object' &&
      typeof obj.ownerDocument === 'object'
    );
  }
}
