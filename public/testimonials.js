
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initCompactStack();
    });
} else {
    initCompactStack();
}

function initCompactStack() {
    const stackContainer = document.getElementById('card-stack');
    if (!stackContainer) return;

    const data = [
        {
            quote: "My team at Johnson & Johnson loved the content for our presentations, outstanding delivery.",
            author: "Pornpimol (Kate)",
            role: "Medical Sales Manager",
            rating: 5,
            avatar: "assets/images/kate.avif"
        },
        {
            quote: "We've seen a 20% increase in conversions since they took over our SEO strategy. Incredible results.",
            author: "Kim & Bae",
            role: "Litigation Attorneys",
            rating: 5,
            avatar: "assets/images/kim_and_bae.avif"
        },
        {
            quote: "We’ve been extremely pleased with the technical and creative expertise GetNifty has delivered.",
            author: "Justin Botillier",
            role: "CEO, Calyx CPA",
            rating: 5,
            avatar: "assets/images/justin_botillier.avif"
        },
        {
            quote: "Their consultation and expertise saved our department millions of dollars annually.",
            author: "Dan Pintea",
            role: "Environmental Systems Manager",
            rating: 5,
            avatar: "assets/images/dan_pintea.avif"
        },
        {
            quote: "We were in a pickle and needed our menu designs out fast. These guys delivered, no drama, no delays.",
            author: "Joe",
            role: "Barstool River North",
            rating: 5,
            avatar: "assets/images/joe_barstool.avif"
        },
        {
            quote: "The quality of work and communication throughout the project was outstanding. Highly recommended!",
            author: "Food Truck Team",
            role: "Community Leaders",
            rating: 5,
            avatar: "assets/images/food_truck.avif"
        }
    ];

    // Create Cards
    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'stack-card';

        card.innerHTML = `
            <div class="stack-stars">
                ${Array(Math.floor(item.rating)).fill('<svg class="stack-star-icon" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"/></svg>').join('')}
            </div>
            <div class="stack-quote"><span class="quote-mark">"</span>${item.quote}<span class="quote-mark">"</span></div>
            <div class="stack-author">
                <img src="${item.avatar}" alt="${item.author}" class="stack-avatar" loading="lazy">
                <div class="stack-meta">
                    <span class="stack-name">${item.author}</span>
                    <span class="stack-role">${item.role}</span>
                </div>
            </div>
        `;

        stackContainer.appendChild(card);
    });

    const cards = Array.from(stackContainer.children);
    let activeIndex = 0;

    function updatePositions() {
        cards.forEach((card, i) => {
            let visualIndex = (i - activeIndex + cards.length) % cards.length;

            if (visualIndex > 2) {
                card.style.opacity = '0';
                card.style.transform = `translateY(40px) scale(0.9) rotate(0deg)`;
                card.style.zIndex = -1;
                return;
            }

            // Design Match: Fan DOWNWARDS and slightly offset right
            // Per image: Background cards peek out from the bottom and right
            const scale = 1 - (visualIndex * 0.02);
            const translateY = visualIndex * 30; // Stronger downward slide
            const translateX = visualIndex * 15; // Slide right slightly
            const rotate = (visualIndex === 0) ? 0 : (visualIndex * -1); // Slight tilt
            const zIndex = cards.length - visualIndex;
            const opacity = 1; // Keep cards opaque for a cleaner look

            card.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.filter = 'none'; // Remove blur to keep it sharp
        });
    }

    updatePositions();

    // Auto Advance
    function nextCard() {
        const frontCard = cards[activeIndex];

        // Fly out animation
        frontCard.style.transform = 'translateY(-120%) rotate(-10deg)';
        frontCard.style.opacity = '0';

        setTimeout(() => {
            activeIndex = (activeIndex + 1) % cards.length;
            updatePositions();

            // Reset the old card instantly
            frontCard.style.transition = 'none';
            frontCard.style.transform = 'translateY(20px) scale(0.8)';
            setTimeout(() => {
                frontCard.style.transition = '';
            }, 50);
        }, 600);
    }

    setInterval(nextCard, 4000);

    // Also allow manual click
    stackContainer.style.cursor = 'pointer';
    stackContainer.addEventListener('click', nextCard);
}
