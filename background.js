function monitorEvents(element) {
  for (const key in element) {
    if (key.startsWith('on')) {
      console.debug(key);
      element.addEventListener(key.slice(2), console.log);
    }
  }
}
monitorEvents(window);