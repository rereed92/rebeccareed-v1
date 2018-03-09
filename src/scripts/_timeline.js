let defaults = {
    selectors: {
        description: '.timeline__description',
        content: '.timeline__content',
        circle: '.timeline__circle'

    },
    classes: {
        hideContent: 'timeline__content--hidden',
        showContent: 'timeline__content--visible',
        hideCircle: 'timeline__circle--hidden',
        showCircle: 'timeline__circle--visible'
    }
};

export default class Timeline {
    constructor() {
        this.selectors = defaults.selectors;
        this.classes = defaults.classes;
    }

    init() {
        const descriptions = document.querySelectorAll(this.selectors.description);

        this.hideItems(descriptions);
        
        window.addEventListener('load', () => this.isVisible(descriptions));
        window.addEventListener('scroll', () => this.isVisible(descriptions));
    }

    isVisible(descriptions) {
        for (const description of descriptions) {
            this.showItem(description);
        }
    }

    hideItems(descriptions) {
        for (const description of descriptions) {
            description.querySelector(this.selectors.content).classList.add(this.classes.hideContent);
            description.querySelector(this.selectors.circle).classList.add(this.classes.hideCircle);
        }
    }

    showItem(description) {
        if (description.getBoundingClientRect().top <= window.innerHeight * 0.75 && description.getBoundingClientRect().top > 0) {
            description.querySelector(this.selectors.content).classList.add(this.classes.showContent);
            description.querySelector(this.selectors.circle).classList.add(this.classes.showCircle);
        }
    }
}