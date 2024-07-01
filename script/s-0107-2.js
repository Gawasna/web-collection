document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('.toggle-checkbox');

    toggleSwitch.addEventListener('change', switchTheme);

    function switchTheme() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
});
