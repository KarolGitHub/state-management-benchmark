export function performanceAPI() {
  'use strict';

  const Performance = {
    perf: typeof window.performance !== 'object' || window.performance,

    /**
     * Navigation Timing API.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API
     * @see http://caniuse.com/nav-timing
     * @returns {boolean|object} Object with navigation timing information or false if not supported
     */
    getNavigationTimings: function getNavigationTimings() {
      if (!this.perf || typeof this.perf.timing !== 'object') {
        return false;
      }
      const data = {};
      const timing = this.perf.timing;
      // navigationStart is the first event taking place in the PerformanceTiming sequence
      const navigationStart = timing.navigationStart;
      // All the keys will be set to the relative time as it gives more value than the time.
      for (let key in timing) {
        // Only numbers are interesting
        if (typeof timing[key] === 'number') {
          // Value should be the time when the given event took place,
          // but might be 0 if the event was not fired or was not completed.
          data[key] = timing[key] === 0 ? 0 : timing[key] - navigationStart;
        }
      }

      if (typeof this.perf.navigation === 'object') {
        const nav = this.perf.navigation;
        data.redirectCount = nav.redirectCount;
        data.navigationType = nav.type < 3 ? ['NAVIGATE', 'RELOAD', 'BACK_FORWARD'][nav.type] : nav.type;
      }

      return data;
    },

    /**
     * Resource Timing API.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
     * @returns {boolean|object} Object with resource loading information or false if not supported
     */
    getResourceTimings: function getResourceTimings() {
      if (!this.perf || typeof this.perf.getEntriesByType !== 'function') {
        return false;
      }
      const entries = JSON.parse(JSON.stringify(this.perf.getEntriesByType('resource')));
      return entries;
    },

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming
     * @returns {boolean|object} Object with paint information or false if not supported
     */

    getPaintTiming: function getPaintTiming() {
      if (!this.perf || typeof this.perf.getEntriesByType !== 'function') {
        return false;
      }
      let entries;
      entries = JSON.parse(JSON.stringify(this.perf.getEntriesByType('paint')));
      return entries;
    },

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory
     * @returns {boolean|object} Object with memory information or false if not supported
     */
    getMemoryInfo: function getMemoryInfo() {
      if (!this.perf || typeof this.perf.memory !== 'object') {
        return false;
      }
      const { totalJSHeapSize, usedJSHeapSize, jsHeapSizeLimit } = this.perf.memory;
      const memory = JSON.parse(JSON.stringify({ totalJSHeapSize, usedJSHeapSize, jsHeapSizeLimit }));
      return memory;
    }
  };

  return {
    url: window.location.pathname,
    userAgent: window.navigator.userAgent,
    navigation: Performance.getNavigationTimings(),
    resource: Performance.getResourceTimings(),
    memory: Performance.getMemoryInfo(),
    paint: Performance.getPaintTiming()
  };
}
