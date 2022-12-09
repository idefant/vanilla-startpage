let suggestions = [];
let activeSuggestionIndex = -1;
let searchValue = '';

const elems = {
  input: document.querySelector('input'),
  form: document.querySelector('form'),
  filter: document.querySelector('.bg-filter'),
  categories: document.querySelector('.categories'),
  container: document.querySelector('.container'),
  suggestions: document.querySelector('.suggestions'),
};

// ===== Suggestions =====

function renderSuggestions() {
  elems.suggestions.innerHTML = createHtmlList(createSuggestion, suggestions);
}

async function createSuggestions() {
  suggestions = await fetchSuggestions(searchValue);
  renderSuggestions();
}

function clearSuggestions() {
  suggestions = [];
  renderSuggestions();
}

function navigateThroughSuggestions(direction) {
  activeSuggestionIndex = ((activeSuggestionIndex + direction + 1) % (suggestions.length + 1)) - 1;
  if (activeSuggestionIndex < -1) {
    activeSuggestionIndex += suggestions.length + 1;
  }

  const suggestionElements = document.querySelectorAll('.suggestion');
  suggestionElements.forEach((elem) => elem.classList.remove('suggestion-active'));
  if (activeSuggestionIndex !== -1) {
    suggestionElements[activeSuggestionIndex].classList.add('suggestion-active');
    elems.input.value = suggestions[activeSuggestionIndex];
  } else {
    elems.input.value = searchValue;
  }
}

hotkey(mappings.suggestionNext, () => navigateThroughSuggestions(1), {
  elem: elems.input,
  preventDefault: true,
});

hotkey(mappings.suggestionPrev, () => navigateThroughSuggestions(-1), {
  elem: elems.input,
  preventDefault: true,
});

// ===== Background Filter =====

function addFilter() {
  elems.filter.style.display = 'block';
  setTimeout(() => (elems.filter.style.opacity = 0.6));
}

function removeFilter() {
  elems.filter.style.opacity = '';
  setTimeout(() => (elems.filter.style.display = 'none'), 200);
}

elems.input.addEventListener('blur', removeFilter);
elems.input.addEventListener('focus', () => searchValue && addFilter());

// ===== Search Line =====

elems.input.addEventListener('input', (e) => {
  searchValue = e.target.value;
  activeSuggestionIndex = -1;

  if (!searchValue) {
    removeFilter();
    clearSuggestions();
    return;
  }

  addFilter();
  if (searchValue.startsWith(hotkeyLeader)) {
    clearSuggestions();
    return;
  }

  createSuggestions();
});

elems.form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (searchValue.startsWith(hotkeyLeader)) {
    const link = getLinkByHotkey(searchValue);
    if (link) {
      window.location.href = fixUrl(link.url);
    } else {
      elems.input.value = hotkeyLeader;
    }
    return;
  }

  google();
});

function google(q = elems.input.value) {
  searchValue = q;
  window.location.href = `https://www.google.com/search?q=${q}`;
  clearSuggestions();
}

// ===== Masonry =====

function createMasonry() {
  const containerWidth = elems.container.offsetWidth;
  const colsCount = Math.floor((containerWidth + gap) / (colWidth + gap));
  const colsHeight = [...Array(colsCount)].map(() => 0);

  const colsSumWidth = (colWidth + gap) * Math.min(colsCount, categories.length) - gap;
  const sidePadding = (containerWidth - colsSumWidth) / 2;
  elems.categories.style.marginLeft = `${sidePadding}px`;
  elems.categories.style.marginRight = `${sidePadding}px`;

  document.querySelectorAll('.category').forEach((elem) => {
    const min = colsHeight.reduce(
      (acc, colHeight, i) => (colHeight < acc.value ? { colIndex: i, value: colHeight } : acc),
      { colIndex: -1, value: Number.MAX_SAFE_INTEGER }
    );

    elem.style.cssText = `top: ${min.value}px; left: ${(colWidth + gap) * min.colIndex}px;`;
    colsHeight[min.colIndex] += elem.offsetHeight + gap;
  });
}

// ===== Initializing App =====

window.addEventListener('load', () => {
  elems.categories.innerHTML = createHtmlList(createCategory, categories);

  const ro = new ResizeObserver(createMasonry);
  document.querySelectorAll('.category').forEach((elem) => ro.observe(elem));
  window.addEventListener('resize', createMasonry);
});
