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

function getSearchInput() {
  return document.getElementById('site-search')
  || document.querySelector('input[class*="searchInput"]')
  || document.querySelector('input[placeholder*="Search"]');
}

chrome.extension.sendMessage({}, () => {
  readyStateCheck(() => {
    const searchInput = getSearchInput();
    if (searchInput) {
      searchInput.focus();
      requestAnimationFrame(() => {
        searchInput.select();
      });
    }
  });
});
