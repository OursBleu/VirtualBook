document.addEventListener('DOMContentLoaded', (event) => {
    let currentPage = 0;
    const pageTurnSound = new Audio('page-turn.wav'); // Path to page turning sound
    let pagesText = [];
    let currentNarration = null; // Reference to the current narration audio

    function updatePages() {
        document.getElementById('pageImage').style.backgroundImage = `url('images/${currentPage}.png')`;

        var text = currentPage < pagesText.length ? pagesText[currentPage] : ''
        document.getElementById('pageText').innerText = text;
    }

    function playNarration(pageNumber) {
        if (currentNarration) {
            currentNarration.pause(); // Stop any currently playing narration
            currentNarration.currentTime = 0; // Reset the audio playback
        }
        currentNarration = new Audio(`audio/${pageNumber}.mp3`);
    
        // Delay playing the narration
        setTimeout(() => {
            currentNarration.play();
        }, 1500); // Delay of 1000 milliseconds (1 second)
    }

    document.getElementById('pageText').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage -= 1;
            updatePages();
            pageTurnSound.play();
            playNarration(currentPage);
        }
    });

    document.getElementById('pageImage').addEventListener('click', () => {
        if (currentPage + 1 < pagesText.length) {
            currentPage += 1;
            updatePages();
            pageTurnSound.play();
            playNarration(currentPage);
        }
    });

    // Load text content and initialize pages
    fetch('text.txt').then(response => response.text()).then(text => {
        pagesText = text.split('@');
        console.log(pagesText)
        // Initialize pages and text for the first time
        updatePages(); // Moved this call after setting pagesText
    }).catch(error => {
        console.error('Error loading text:', error);
    });
});