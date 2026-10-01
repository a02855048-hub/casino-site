// Jackpot counter animation
let jackpot = 124567890;
const jackpotEl = document.getElementById('jackpot');

setInterval(() => {
    jackpot += Math.floor(Math.random() * 50) + 10;
    jackpotEl.textContent = '৳ ' + jackpot.toLocaleString('bn-BD');
}, 2000);

// Game Modal
const modal = document.getElementById('gameModal');
const modalTitle = document.getElementById('modalTitle');
const gameArea = document.getElementById('gameArea');

const gameMessages = {
    slots: '🎰 স্লট মেশিন ঘুরছে...\n\nআপনি জিতেছেন ৳৫,০০০! (ডেমো)',
    roulette: '🎡 রুলেট স্পিন হচ্ছে...\n\nবল ল্যান্ড করেছে ১৭ রেডে! (ডেমো)',
    blackjack: '🃏 কার্ড ডিল হচ্ছে...\n\nআপনার হাত: ২০ | ডিডর: ১৮\nআপনি জিতেছেন! (ডেমো)',
    poker: '♠️ পোকার টেবিল প্রস্তুত...\n\nআপনার হাত: রয়্যাল ফ্লাশ! (ডেমো)',
    craps: '🎲 ডাইস রোল হচ্ছে...\n\n৭ এসেছে! আপনি জিতেছেন! (ডেমো)',
    live: '💎 লাইভ ডিলার কানেক্ট হচ্ছে...\n\nলাইভ টেবিল খোলা আছে (ডেমো)'
};

function playGame(game) {
    modal.style.display = 'flex';
    modalTitle.textContent = game.charAt(0).toUpperCase() + game.slice(1);
    gameArea.innerHTML = '<div class="loading">লোড হচ্ছে...</div>';
    
    setTimeout(() => {
        gameArea.innerHTML = `<pre style="white-space: pre-wrap; font-family: Poppins, sans-serif;">${gameMessages[game]}</pre>`;
    }, 1500);
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});