export default class Alert {
    constructor(jsonPath = '/json/alerts.json') {
        this.jsonPath = jsonPath;
        this.init();
    }

    async init() {
        const alerts = await this.fetchAlerts();
        if (alerts && alerts.length > 0) {
            this.renderAlerts(alerts);
        }
    }

    async fetchAlerts() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) throw new Error('Failed to fetch alerts');
            return await response.json();
        } catch (error) {
            console.error('Alert Error:', error);
            return [];
        }
    }

    renderAlerts(alerts) {
        const alertSection = document.createElement('section');
        alertSection.classList.add('alert-list');

        alerts.forEach((alert) => {
            const p = document.createElement('p');
            p.textContent = alert.message;
            if (alert.background) p.style.backgroundColor = alert.background;
            if (alert.color) p.style.color = alert.color;
            alertSection.appendChild(p);
        });

        const main = document.querySelector('main');
        if (main) {
            main.prepend(alertSection);
        }
    }
}