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