document.querySelectorAll('nav a[data-content]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const contentUrl = this.getAttribute('data-content');

        fetch(contentUrl)
            .then(response => response.text())
            .then(data => {
                document.querySelector('main').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading content:', error);
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const linksContainer = document.querySelector('nav ul');
    const htmlContentContainer = document.getElementById('html-content');
    const cssContentContainer = document.getElementById('css-content');
    const copyHtmlButton = document.getElementById('copy-html');
    const copyCssButton = document.getElementById('copy-css');
    const toggleHtmlButton = document.getElementById('toggle-html');
    const toggleCssButton = document.getElementById('toggle-css');
    let allLinks = [];
    const featuredLinks = [
        {"name": "Flex grow: hover effect", "url": "html/cl-3006-1.html"},
        {"name": "Clip Path Image", "url": "html/cl-3006-2.html"},
        {"name": "Tab indicator animation", "url": "html/cl-3006-3.html"},
        {"name": "Responsive Grid Layout", "url": "html/cl-3006-4.html"},
        {"name": "CSS Variables", "url": "html/cl-3006-5.html"},
        {"name": "JavaScript Event Delegation", "url": "html/cl-3006-6.html"},
        {"name": "Glow hover effect", "url": "html/cl-0107-1.html"},
        {"name": "CSS Flexbox", "url": "html/cl-3006-8.html"},
        {"name": "Dark theme switch", "url":"html/cl-0107-2.html"},
        {"name": "Glow hover effect 2", "url":"html/cl-0107-4.html"}
    ];

    function displayLinks(links) {
        linksContainer.innerHTML = '';
        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            a.setAttribute('data-content', link.url);
            li.appendChild(a);
            linksContainer.appendChild(li);
        });
        addClickEvents();
    }

    function fetchLinks() {
        fetch('links.json')
            .then(response => response.json())
            .then(data => {
                allLinks = data;
                displayLinks(featuredLinks);
            })
            .catch(error => console.error('Error fetching links:', error));
    }

    function addClickEvents() {
        document.querySelectorAll('nav a[data-content]').forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const contentUrl = this.getAttribute('data-content');

                fetch(contentUrl)
                    .then(response => response.text())
                    .then(data => {
                        document.querySelector('main').innerHTML = data;
                        displayHtmlAndCss(data);
                    })
                    .catch(error => {
                        console.error('Error loading content:', error);
                    });
            });
        });
    }

    function displayHtmlAndCss(data) {
        const htmlMatch = data.match(/<body[^>]*>((.|[\n\r])*)<\/body>/im);
        const cssMatch = data.match(/<style[^>]*>((.|[\n\r])*)<\/style>/im);
        
        const htmlContent = htmlMatch ? htmlMatch[1] : 'No HTML content found';
        const cssContent = cssMatch ? cssMatch[1] : 'No CSS content found';
        
        htmlContentContainer.textContent = htmlContent;
        cssContentContainer.textContent = cssContent;
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    copyHtmlButton.addEventListener('click', () => {
        copyToClipboard(htmlContentContainer.textContent);
        alert('HTML content copied to clipboard');
    });

    copyCssButton.addEventListener('click', () => {
        copyToClipboard(cssContentContainer.textContent);
        alert('CSS content copied to clipboard');
    });

    toggleHtmlButton.addEventListener('click', () => {
        if (htmlContentContainer.style.display === 'none') {
            htmlContentContainer.style.display = 'block';
            toggleHtmlButton.textContent = 'Hide HTML Content';
        } else {
            htmlContentContainer.style.display = 'none';
            toggleHtmlButton.textContent = 'Show HTML Content';
        }
    });

    toggleCssButton.addEventListener('click', () => {
        if (cssContentContainer.style.display === 'none') {
            cssContentContainer.style.display = 'block';
            toggleCssButton.textContent = 'Hide CSS Content';
        } else {
            cssContentContainer.style.display = 'none';
            toggleCssButton.textContent = 'Show CSS Content';
        }
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length <= 1) {
            displayLinks(featuredLinks);
        } else {
            const filteredLinks = allLinks.filter(link => link.name.toLowerCase().includes(searchTerm));
            displayLinks(filteredLinks);
        }
    });

    fetchLinks();
});
