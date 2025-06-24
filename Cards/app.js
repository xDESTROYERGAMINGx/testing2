const carouselEl = document.getElementById('carousel');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

const detailsModal = document.getElementById('details-modal');
const modalCloseBtn = document.getElementById('modal-close');
const personNameEl = document.getElementById('person-name');
const galleryEl = document.getElementById('gallery');

const imgModal = document.getElementById('img-modal');
const imgModalClose = document.getElementById('img-modal-close');
const enlargedImg = document.getElementById('enlarged-img');

const imgPrevBtn = document.getElementById('img-prev');
const imgNextBtn = document.getElementById('img-next');

const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions');
const resetBtn = document.querySelector('.reset');

const infoButton = document.getElementById('info-button');
const infoOverlay = document.getElementById('info-overlay');
const closeInfo = document.getElementById('close-info');

let currentIndex = 0;
let currentGalleryImages = [];
let currentGalleryIndex = 0;
let selectedSuggestionIndex = -1;

function circularIndex(index) {
  const len = people.length;
  return ((index % len) + len) % len;
}

function renderCarousel() {
  carouselEl.innerHTML = '';
  const range = 2;

  for (let offset = -range; offset <= range; offset++) {
    const i = circularIndex(currentIndex + offset);
    const person = people[i];
    const card = document.createElement('div');
    card.classList.add('card');

    if (offset === 0) {
      card.classList.add('center');
      card.setAttribute('aria-current', 'true');
      card.setAttribute('tabindex', '0');
    } else {
      card.classList.add('side');
      card.setAttribute('aria-current', 'false');
      card.setAttribute('tabindex', '-1');
    }

    card.style.setProperty('--bg-image', `url('${person.cardImage}')`);
    card.innerHTML = `<div class="card-content">${person.name}</div>`;
    card.dataset.index = i;

    card.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveLeft();
        focusCenterCard();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveRight();
        focusCenterCard();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showDetails(i);
      }
    });

    card.addEventListener('click', () => {
      if (i !== currentIndex) {
        currentIndex = i;
        renderCarousel();
        showDetails(i);
        focusCenterCard();
      } else {
        if (detailsModal.classList.contains('show')) {
          modalCloseBtn.click();
        } else {
          showDetails(i);
        }
      }
    });

    carouselEl.appendChild(card);
  }
}

function focusCenterCard() {
  const centerCard = carouselEl.querySelector('.card.center');
  if (centerCard) centerCard.focus();
}

function moveLeft() {
  currentIndex = circularIndex(currentIndex - 1);
  renderCarousel();
}

function moveRight() {
  currentIndex = circularIndex(currentIndex + 1);
  renderCarousel();
}

function showDetails(index) {
  const person = people[index];
  personNameEl.textContent = person.name;

  galleryEl.innerHTML = '';
  currentGalleryImages = person.images;
  currentGalleryIndex = 0;

  person.images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${person.name} image ${i + 1}`;
    img.dataset.index = i;
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => openImageModal(src, i));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openImageModal(src, i);
      }
    });
    galleryEl.appendChild(img);
  });

  galleryEl.scrollLeft = 0;

  const modalContent = detailsModal.querySelector('.modal-content');
  const oldSidePics = modalContent.querySelector('.side-pics-info');
  if (oldSidePics) oldSidePics.remove();

  const sidePicsInfoDiv = document.createElement('div');
  sidePicsInfoDiv.className = 'side-pics-info';
  sidePicsInfoDiv.style.display = 'flex';
  sidePicsInfoDiv.style.justifyContent = 'center';
  sidePicsInfoDiv.style.alignItems = 'center';
  sidePicsInfoDiv.style.gap = '1rem';
  sidePicsInfoDiv.style.marginTop = '1rem';
  sidePicsInfoDiv.style.marginBottom = '1rem';

  const leftImg = document.createElement('img');
  leftImg.src = person.twoSidePics[0];
  leftImg.alt = `${person.name} left side picture`;
  leftImg.style.width = '120px';
  leftImg.style.height = '120px';
  leftImg.style.objectFit = 'cover';
  leftImg.style.borderRadius = '12px';
  leftImg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';

  const infoDiv = document.createElement('div');
  infoDiv.style.color = '#eee';
  infoDiv.style.fontWeight = '700';
  infoDiv.style.fontSize = '1.1rem';
  infoDiv.style.textAlign = 'center';
  infoDiv.style.minWidth = '170px';
  infoDiv.innerHTML = `
    <div><strong>ID:</strong> ${person.id}</div>
    <div><strong>3 Star Bases:</strong> ${person.threeStarBases}</div>
    <div><strong>Winrate:</strong> ${person.winrate}</div>
  `;

  const rightImg = document.createElement('img');
  rightImg.src = person.twoSidePics[1];
  rightImg.alt = `${person.name} right side picture`;
  rightImg.style.width = '120px';
  rightImg.style.height = '120px';
  rightImg.style.objectFit = 'cover';
  rightImg.style.borderRadius = '12px';
  rightImg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';

  sidePicsInfoDiv.appendChild(leftImg);
  sidePicsInfoDiv.appendChild(infoDiv);
  sidePicsInfoDiv.appendChild(rightImg);

  personNameEl.insertAdjacentElement('afterend', sidePicsInfoDiv);

  detailsModal.classList.remove('hidden');
  setTimeout(() => detailsModal.classList.add('show'), 10);

  modalCloseBtn.focus();
}

function openImageModal(src, index) {
  enlargedImg.src = src;
  currentGalleryIndex = index;
  imgModal.classList.remove('hidden');
  setTimeout(() => imgModal.classList.add('show'), 10);

  if (currentGalleryImages.length > 1) {
    imgPrevBtn.style.display = 'block';
    imgNextBtn.style.display = 'block';
  } else {
    imgPrevBtn.style.display = 'none';
    imgNextBtn.style.display = 'none';
  }

  imgModalClose.focus();
}

imgPrevBtn.addEventListener('click', () => {
  if (currentGalleryImages.length === 0) return;
  currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  enlargedImg.src = currentGalleryImages[currentGalleryIndex];
});

imgNextBtn.addEventListener('click', () => {
  if (currentGalleryImages.length === 0) return;
  currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
  enlargedImg.src = currentGalleryImages[currentGalleryIndex];
});

imgModal.addEventListener('keydown', e => {
  if (!imgModal.classList.contains('show')) return;
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    imgPrevBtn.click();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    imgNextBtn.click();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    imgModalClose.click();
  }
});

modalCloseBtn.addEventListener('click', () => {
  detailsModal.classList.remove('show');
  setTimeout(() => detailsModal.classList.add('hidden'), 300);
  focusCenterCard();
});

imgModalClose.addEventListener('click', () => {
  imgModal.classList.remove('show');
  setTimeout(() => {
    imgModal.classList.add('hidden');
    imgPrevBtn.style.display = 'none';
    imgNextBtn.style.display = 'none';
  }, 300);
  const galleryImgs = galleryEl.querySelectorAll('img');
  if (galleryImgs[currentGalleryIndex]) galleryImgs[currentGalleryIndex].focus();
});

detailsModal.addEventListener('click', e => {
  if (e.target === detailsModal) modalCloseBtn.click();
});
imgModal.addEventListener('click', e => {
  if (e.target === imgModal) imgModalClose.click();
});

let isDown = false, startX, scrollLeft;

galleryEl.addEventListener('mousedown', e => {
  isDown = true;
  galleryEl.classList.add('active');
  startX = e.pageX - galleryEl.offsetLeft;
  scrollLeft = galleryEl.scrollLeft;
  e.preventDefault();
});
galleryEl.addEventListener('mouseleave', () => {
  isDown = false;
  galleryEl.classList.remove('active');
});
galleryEl.addEventListener('mouseup', () => {
  isDown = false;
  galleryEl.classList.remove('active');
});
galleryEl.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - galleryEl.offsetLeft;
  const walk = (x - startX) * 2;
  galleryEl.scrollLeft = scrollLeft - walk;
});
galleryEl.addEventListener('touchstart', e => {
  isDown = true;
  startX = e.touches[0].pageX - galleryEl.offsetLeft;
  scrollLeft = galleryEl.scrollLeft;
});
galleryEl.addEventListener('touchend', () => isDown = false);
galleryEl.addEventListener('touchmove', e => {
  if (!isDown) return;
  const x = e.touches[0].pageX - galleryEl.offsetLeft;
  const walk = (x - startX) * 2;
  galleryEl.scrollLeft = scrollLeft - walk;
});

btnLeft.addEventListener('click', () => {
  moveLeft();
  focusCenterCard();
});
btnRight.addEventListener('click', () => {
  moveRight();
  focusCenterCard();
});

function updateSuggestions(query) {
  const normalizedQuery = query.trim().toLowerCase();
  suggestionsList.innerHTML = '';

  if (normalizedQuery === '') {
    suggestionsList.classList.remove('show');
    searchInput.setAttribute('aria-expanded', 'false');
    return;
  }

  const matches = people.filter(p => p.name.toLowerCase().startsWith(normalizedQuery));

  if (matches.length === 0) {
    suggestionsList.classList.remove('show');
    searchInput.setAttribute('aria-expanded', 'false');
    return;
  }

  matches.forEach(person => {
    const li = document.createElement('li');
    li.textContent = person.name;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.dataset.index = people.indexOf(person);

    li.addEventListener('click', () => {
      selectSuggestion(parseInt(li.dataset.index, 10));
    });

    suggestionsList.appendChild(li);
  });

  suggestionsList.classList.add('show');
  searchInput.setAttribute('aria-expanded', 'true');
}

function selectSuggestion(index) {
  currentIndex = index;
  renderCarousel();
  showDetails(index);
  searchInput.value = '';
  suggestionsList.innerHTML = '';
  suggestionsList.classList.remove('show');
  searchInput.setAttribute('aria-expanded', 'false');
  selectedSuggestionIndex = -1;
  focusCenterCard();
}

searchInput.addEventListener('input', e => {
  updateSuggestions(e.target.value);
  selectedSuggestionIndex = -1;
});

searchInput.addEventListener('keydown', e => {
  const items = suggestionsList.querySelectorAll('li');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
    updateAriaSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedSuggestionIndex = (selectedSuggestionIndex - 1 + items.length) % items.length;
    updateAriaSelection(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < items.length) {
      const index = parseInt(items[selectedSuggestionIndex].dataset.index, 10);
      selectSuggestion(index);
    } else if (searchInput.value.trim() !== '') {
      const exactMatchIndex = people.findIndex(p => p.name.toLowerCase() === searchInput.value.trim().toLowerCase());
      if (exactMatchIndex !== -1) {
        selectSuggestion(exactMatchIndex);
      }
    }
  } else if (e.key === 'Escape') {
    suggestionsList.classList.remove('show');
    searchInput.setAttribute('aria-expanded', 'false');
  }
});

function updateAriaSelection(items) {
  items.forEach((item, idx) => {
    if (idx === selectedSuggestionIndex) {
      item.setAttribute('aria-selected', 'true');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.setAttribute('aria-selected', 'false');
    }
  });
}

document.addEventListener('click', e => {
  if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
    suggestionsList.classList.remove('show');
    searchInput.setAttribute('aria-expanded', 'false');
  }
});

resetBtn.addEventListener('click', () => {
  suggestionsList.innerHTML = '';
  suggestionsList.classList.remove('show');
  searchInput.setAttribute('aria-expanded', 'false');
  searchInput.focus();
});

const searchForm = document.getElementById('search-form');
if (searchForm) {
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    if (searchInput.value.trim() !== '') {
      const exactMatchIndex = people.findIndex(p => p.name.toLowerCase() === searchInput.value.trim().toLowerCase());
      if (exactMatchIndex !== -1) {
        selectSuggestion(exactMatchIndex);
      }
    }
  });
}

infoButton.addEventListener('click', () => {
  infoOverlay.classList.remove('hidden');
  infoOverlay.focus();
});

closeInfo.addEventListener('click', () => {
  infoOverlay.classList.add('hidden');
  infoButton.focus();
});

infoOverlay.addEventListener('click', e => {
  if (e.target === infoOverlay) {
    infoOverlay.classList.add('hidden');
    infoButton.focus();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !infoOverlay.classList.contains('hidden')) {
    infoOverlay.classList.add('hidden');
    infoButton.focus();
  }
});

renderCarousel();
focusCenterCard();



function applyResponsiveLayout() {
  const isMobile = window.innerWidth <= 600;

  // Adjust carousel cards
  const cards = carouselEl.querySelectorAll('.card');
  cards.forEach(card => {
    if (isMobile) {
      if (card.classList.contains('center')) {
        card.style.width = '180px';
        card.style.height = '280px';
        card.style.fontSize = '1.3rem';
      } else {
        card.style.width = '100px';
        card.style.height = '160px';
        card.style.fontSize = '1rem';
        card.style.filter = 'brightness(0.7)';
      }
    } else {

      card.style.width = '';
      card.style.height = '';
      card.style.fontSize = '';
      card.style.filter = '';
    }
  });

  const sidePicsInfoDiv = detailsModal.querySelector('.side-pics-info');
  if (sidePicsInfoDiv) {
    const imgs = sidePicsInfoDiv.querySelectorAll('img');
    imgs.forEach(img => {
      if (isMobile) {
        img.style.width = '60px';
        img.style.height = '60px';
        img.style.borderRadius = '8px';
      } else {
        img.style.width = '120px';
        img.style.height = '120px';
        img.style.borderRadius = '12px';
      }
    });

    const infoDiv = sidePicsInfoDiv.querySelector('div');
    if (infoDiv) {
      infoDiv.style.fontSize = isMobile ? '1rem' : '1.1rem';
      infoDiv.style.minWidth = isMobile ? '120px' : '170px';
    }
  }

  if (galleryEl) {
    const galleryImgs = galleryEl.querySelectorAll('img');
    galleryImgs.forEach(img => {
      if (isMobile) {
        img.style.width = '60px';
        img.style.height = '60px';
      } else {
        img.style.width = '80px';
        img.style.height = '80px';
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  applyResponsiveLayout();
});

window.addEventListener('resize', () => {
  applyResponsiveLayout();
});

const originalRenderCarousel = renderCarousel;
renderCarousel = function () {
  originalRenderCarousel();
  applyResponsiveLayout();
};

const originalShowDetails = showDetails;
showDetails = function (index) {
  originalShowDetails(index);
  applyResponsiveLayout();
};
