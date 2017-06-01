export function bindClassMethods(...methodNames) {
  methodNames.forEach(methodName => {
    try {
      this[methodName] = this[methodName].bind(this);
    } catch (error) {
      if (__DEV__) {
        console.warn(`You are trying to bind an undefined method(${methodName}) to ${this.constructor.name}`);
      }
      throw error;
    }
  });
}
