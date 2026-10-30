// Tokens are transient objects, never project data. WeakSet keeps completed
// gestures idempotent without retaining old projects or growing a global log.
export function createInsertionGate() {
  const consumed = new WeakSet();
  return (token, operation) => {
    if (token !== undefined) {
      if (!token || typeof token !== 'object' || consumed.has(token)) return false;
      consumed.add(token); // Consume before mutation: re-entrant calls cannot insert.
    }
    return operation();
  };
}

export function paletteClickAllowed(event, gesture) {
  // Keyboard/assistive and explicit programmatic click are independent actions.
  if (!(event.detail > 0 || event.nativeEvent?.pointerId >= 0)) return true;
  if (!gesture || gesture.source !== event.currentTarget || gesture.cancelled ||
      gesture.dragged || gesture.clicked) return false;
  gesture.clicked = true;
  return true;
}
