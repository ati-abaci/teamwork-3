const form = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');

form.onsubmit = e => {
    e.preventDefault();
    let isValid = true;
    const { name, email, message } = form.elements;

    [name, email, message].forEach(field => {
        field.classList.remove('error');
        if (field.value.trim() === '') {
            field.classList.add('error');
            isValid = false;
        }
    });

    if (isValid) {
        responseMessage.style.cssText = 'display:block; color:green';
        responseMessage.innerText = `Thank you, ${name.value}, for reaching out!`;
        form.reset();
    } else {
        responseMessage.style.cssText = 'display:block; color:red';
        responseMessage.innerText = 'Please fill out all fields correctly.';
    }
};