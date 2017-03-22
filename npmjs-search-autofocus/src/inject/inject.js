function readyStateCheck(done) {
  const checkState = () => {
    if (document.readyState !== 'complete') {
      requestAnimationFrame(checkState);
    } else {
      done();
    }
  };
  checkState();
}

chrome.extension.sendMessage({}, () => {
  readyStateCheck(() => {
    const searchInput = document.getElementById('site-search');
    if (searchInput) {
      searchInput.focus();
      requestAnimationFrame(() => {
        searchInput.select();
      });
    }
  });
});
