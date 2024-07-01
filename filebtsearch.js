document.addEventListener('DOMContentLoaded', function() {
    const globalSearchInput = document.getElementById('global-search-input');
    const searchResultsModal = document.getElementById('search-results-modal');
    const searchResultsList = document.getElementById('search-results');
    
    globalSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        if (searchTerm.length >= 2) {
            searchFiles(searchTerm);
        } else {
            clearSearchResults();
        }
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('close')) {
            searchResultsModal.style.display = 'none';
        }
    });

    function searchFiles(searchTerm) {
        fetch('search-results.json')
            .then(response => response.json())
            .then(data => {
                showSearchResults(data, searchTerm);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }

    function showSearchResults(results, searchTerm) {
        clearSearchResults();
        
        results.forEach(result => {
            if (result.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = result.path;
                link.textContent = result.name;
                link.setAttribute('data-content', result.path);
                li.appendChild(link);
                searchResultsList.appendChild(li);
            }
        });

        searchResultsModal.style.display = 'block';
    }

    function clearSearchResults() {
        searchResultsList.innerHTML = '';
        searchResultsModal.style.display = 'none';
    }
});
