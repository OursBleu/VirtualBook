let currentPage = 1;
const pageTurnSound = new Audio('page-turn.wav'); // Path to page turning sound
let pagesText = [];
let currentNarration = null; // Reference to the current narration audio

function updatePages() {
    document.getElementById('leftPage').style.backgroundImage = `url('images/${currentPage}.png')`;
    document.getElementById('rightPage').style.backgroundImage = `url('images/${currentPage + 1}.png')`;
    updateText();
}

function playNarration(pageNumber) {
    if (currentNarration) {
        currentNarration.pause(); // Stop any currently playing narration
    }
    currentNarration = new Audio(`audio/${pageNumber}.mp3`);
    currentNarration.play();
}

document.getElementById('leftPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage -= 2;
        updatePages();
        // Not replaying audio
    }
});

document.getElementById('rightPage').addEventListener('click', () => {
    if (currentPage < pagesText.length) {
        currentPage += 2;
        updatePages();
        pageTurnSound.play();
        playNarration(currentPage);
    }
});

function updateText() {
    const leftPageIndex = currentPage - 1;
    const rightPageIndex = currentPage;

    // Update text for the left page
    document.getElementById('leftPageText').innerText = leftPageIndex < pagesText.length ? pagesText[leftPageIndex] : '';

    // Update text for the right page
    document.getElementById('rightPageText').innerText = rightPageIndex < pagesText.length ? pagesText[rightPageIndex] : '';
}

// Load text content and initialize pages
fetch('text.txt').then(response => response.text()).then(text => {
    pagesText = text.split('\n\n');
    
    // Initialize pages and text for the first time
    updatePages(); // Moved this call after setting pagesText
}).catch(error => {
    console.error('Error loading text:', error);
});