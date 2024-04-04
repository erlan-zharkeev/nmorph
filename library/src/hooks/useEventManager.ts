type AdjustFunction = () => void;

class ResizeEventManager {
  private adjustFunctions: Set<AdjustFunction> = new Set();

  constructor() {
    window.addEventListener('resize', this.handleResize);
  }

  registerAdjustFunction(fn: AdjustFunction) {
    this.adjustFunctions.add(fn);
  }

  unregisterAdjustFunction(fn: AdjustFunction) {
    this.adjustFunctions.delete(fn);
  }

  private handleResize = () => {
    this.adjustFunctions.forEach((fn) => fn());
  };
}

export const resizeEventManager = new ResizeEventManager();
