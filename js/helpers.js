function fixUrl(url) {
  const isValid = /^((http|https):\/\/)/.test(url);
  return isValid ? url : `https://${url}`;
}

function getLinkByHotkey(searchValue) {
  const hotkey = searchValue.slice(hotkeyLeader.length);

  for (category of categories) {
    for (link of category.links) {
      if (link.hotkey?.toLowerCase() === hotkey.toLowerCase()) {
        return link;
      }
    }
  }
}

function createHtmlList(callback, items) {
  return items.map(callback).join('');
}

function createCategory(category) {
  return `<div class="category">
    <div class="category__name">${category.name}</div>
    <div class="links">${createHtmlList(createLink, category.links)}</div>
  </div>`;
}

function createLink(link) {
  return `<a href="${fixUrl(link.url)}" class="link">${link.name}</a>`;
}

function createSuggestion(suggestion) {
  return `<div class="suggestion" onclick="google('${suggestion}')">
    ${suggestion}
  </div>`;
}

async function fetchSuggestions(searchValue) {
  const response = await fetch(
    `https://suggestqueries.google.com/complete/search?client=chrome&q=${searchValue}`,
    { headers: { Origin: '*' } }
  );
  if (!searchValue || !response) return;
  const responseData = await response.json();
  return responseData[1];
}
