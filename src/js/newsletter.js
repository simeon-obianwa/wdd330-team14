export default class Newsletter {
    constructor(formSelector, messageSelector) {
        this.form = document.querySelector(formSelector);
        this.messageElement = document.querySelector(messageSelector);
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        const emailInput = this.form.querySelector('input[type="email"]');
        const email = emailInput.value;

        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');

        const isDuplicate = subscribers.some(sub => sub.email === email);

        if (!isDuplicate) {
            subscribers.push({ email, subscribedAt: new Date().toISOString() });
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            this.displayMessage('Thank you for subscribing!', 'success');
        } else {
            this.displayMessage('This email is already subscribed.', 'error');
        }

        this.form.reset();
    }

    displayMessage(text, type) {
        if (this.messageElement) {
            this.messageElement.textContent = text;
            this.messageElement.style.color = type === 'error' ? '#d9534f' : '#28a745';
            this.messageElement.hidden = false;

            setTimeout(() => {
                this.messageElement.hidden = true;
            }, 5000);
        }
    }
}