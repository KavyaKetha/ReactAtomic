document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('acknowledgement').style.display = 'block';
    this.reset();
});
