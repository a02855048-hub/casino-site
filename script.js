// ========== Global Balance ==========
let balance = 10000;
let currentBet = 100;

const symbols = ['🍒', '🍋', '🔔', '⭐', '7️⃣', '💎'];

// Update balance display
function updateBalance() {
    document.getElementById('balance').textContent = '৳ ' + balance.toLocaleString('bn-BD');
    const slotsBal = document.getElementById('slotsBalance');
    if (slotsBal) slotsBal.textContent = '৳ ' + balance.toLocaleString('bn-BD');
}

// Jackpot animation
let jackpot = 124567890;
setInterval(() => {
    jackpot += Math.floor(Math.random() * 80) + 20;
    document.getElementById('jackpot').textContent = '৳ ' + jackpot.toLocaleString('bn-BD');
}, 1800);

// ========== Regular Game Modal ==========
const modal = document.getElementById('gameModal');
const modalTitle = document.getElementById('modalTitle');
const gameArea = document.getElementById('gameArea');

const gameMessages = {
    roulette: '🎡 রুলেট স্পিন হচ্ছে...\n\nবল ল্যান্ড করেছে <strong>১৭ রেড</strong> এ!\nআপনি জিতেছেন ৳২,৫০০! (ডেমো)',
    blackjack: '🃏 কার্ড ডিল হচ্ছে...\n\nআপনার হাত: <strong>২০</strong> | ডিডর: <strong>১৮</strong>\n🎉 আপনি জিতেছেন! (ডেমো)',
    poker: '♠️ পোকার টেবিল প্রস্তুত...\n\nআপনার হাত: <strong>রয়্যাল ফ্লাশ</strong>!\nবিশাল জয়! (ডেমো)',
    craps: '🎲 ডাইস রোল হচ্ছে...\n\n<strong>৭</strong> এসেছে! আপনি জিতেছেন! (ডেমো)',
    live: '💎 লাইভ ডিলার কানেক্ট হচ্ছে...\n\nলাইভ টেবিল খোলা আছে (ডেমো)'
};

function playGame(game) {
    modal.style.display = 'flex';
    modalTitle.textContent = game.charAt(0).toUpperCase() + game.slice(1);
    gameArea.innerHTML = '<div style="color:#aaa">লোড হচ্ছে...</div>';
    
    setTimeout(() => {
        gameArea.innerHTML = gameMessages[game];
    }, 1200);
}

function closeModal() {
    modal.style.display = 'none';
}

// ========== Slots Game ==========
const slotsModal = document.getElementById('slotsModal');

function openSlots() {
    slotsModal.style.display = 'flex';
    updateBalance();
    document.getElementById('slotsResult').textContent = '';
}

function closeSlots() {
    slotsModal.style.display = 'none';
}

function changeBet(amount) {
    currentBet = Math.max(100, Math.min(balance, currentBet + amount));
    document.getElementById('currentBet').textContent = '৳ ' + currentBet.toLocaleString('bn-BD');
}

function spinSlots() {
    if (balance < currentBet) {
        document.getElementById('slotsResult').innerHTML = '<span style="color:#e74c3c">পর্যাপ্ত ব্যালেন্স নেই!</span>';
        return;
    }

    const spinBtn = document.getElementById('spinBtn');
    spinBtn.disabled = true;
    document.getElementById('slotsResult').textContent = '';

    balance -= currentBet;
    updateBalance();

    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];

    let spins = 0;
    const maxSpins = 15;

    const interval = setInterval(() => {
        reels.forEach(reel => {
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });
        spins++;

        if (spins >= maxSpins) {
            clearInterval(interval);

            // Final result
            const results = reels.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
            reels.forEach((reel, i) => reel.textContent = results[i]);

            // Check win
            let winAmount = 0;
            let message = '';

            if (results[0] === results[1] && results[1] === results[2]) {
                // Jackpot / 3 match
                if (results[0] === '7️⃣') {
                    winAmount = currentBet * 50;
                    message = `🎉 জ্যাকপট! ৭৭৭! আপনি জিতেছেন ৳${winAmount.toLocaleString('bn-BD')}`;
                } else if (results[0] === '💎') {
                    winAmount = currentBet * 30;
                    message = `💎 ডায়মন্ড! আপনি জিতেছেন ৳${winAmount.toLocaleString('bn-BD')}`;
                } else {
                    winAmount = currentBet * 10;
                    message = `🎊 তিনটি ম্যাচ! আপনি জিতেছেন ৳${winAmount.toLocaleString('bn-BD')}`;
                }
            } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
                winAmount = currentBet * 2;
                message = `👍 দুইটি ম্যাচ! আপনি জিতেছেন ৳${winAmount.toLocaleString('bn-BD')}`;
            } else {
                message = '😞 আরও চেষ্টা করুন!';
            }

            if (winAmount > 0) {
                balance += winAmount;
                updateBalance();
                document.getElementById('slotsResult').innerHTML = `<span style="color:#2ecc71">${message}</span>`;
            } else {
                document.getElementById('slotsResult').innerHTML = `<span style="color:#e74c3c">${message}</span>`;
            }

            spinBtn.disabled = false;
        }
    }, 100);
}

// ========== Bonus Claim ==========
function claimBonus(amount) {
    balance += amount;
    updateBalance();
    alert(`🎉 অভিনন্দন! আপনি ৳${amount.toLocaleString('bn-BD')} বোনাস পেয়েছেন! (ডেমো)`);
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target === modal) closeModal();
    if (event.target === slotsModal) closeSlots();
}

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Initial
updateBalance();