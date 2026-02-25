document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    const resultsGrid = document.getElementById('resultsGrid');
    const initialState = document.getElementById('initialState');
    const emptyState = document.getElementById('emptyState');

    // dictionaryData is loaded from data.js
    if (typeof dictionaryData === 'undefined') {
        initialState.innerHTML = '<i class="ri-error-warning-line" style="color:#ef4444;"></i><p>Gagal memuat data kamus.</p>';
    }

    searchInput.addEventListener('input', (e) => {
        const rawValue = e.target.value;
        const query = rawValue.toLowerCase().trim();

        // Show/hide clear button
        if (query.length > 0) {
            clearBtn.classList.add('visible');
        } else {
            clearBtn.classList.remove('visible');
        }

        // Validate characters (only lowercase letters for our index)
        if (!/^[a-z]*$/.test(query)) {
            // Revert non-letters visually
            searchInput.value = query.replace(/[^a-z]/g, '');
            return;
        }

        updateResults(query);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        clearBtn.classList.remove('visible');
        updateResults('');
    });

    function updateResults(query) {
        // Clear previous results
        resultsGrid.innerHTML = '';

        if (!query) {
            initialState.classList.remove('hidden');
            emptyState.classList.add('hidden');
            return;
        }

        initialState.classList.add('hidden');

        // Check if query exists in dictionary and has items
        if (dictionaryData[query] && dictionaryData[query].length > 0) {
            emptyState.classList.add('hidden');

            // Render results
            dictionaryData[query].forEach((word, index) => {
                const card = document.createElement('div');
                card.className = 'word-card';
                card.style.animationDelay = `${index * 0.05}s`;

                card.innerHTML = `
                    <span class="word-text">${word}</span>
                    <div class="word-arrow">
                        <i class="ri-arrow-right-down-line"></i>
                    </div>
                `;

                resultsGrid.appendChild(card);
            });
        } else {
            // Not found or empty
            emptyState.classList.remove('hidden');
        }
    }
});
