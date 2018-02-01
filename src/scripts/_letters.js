let defaults = {
    $element: undefined,
    selectors: {
        letter: '.letters__wobble',
    },
    classes: {
        visible: 'letters__wobble--visible',
    }
};

export default class Letters {
    constructor() {
        this.$element = defaults.$element;
        this.selectors = defaults.selectors;
        this.classes = defaults.classes;
    }

    init() {
        if (window.location.pathname === '/') {
            setTimeout(() => {
                this.showLetters();
            }, 2200);
        } else {
            this.showLetters();
        }
    }
    
    showLetters() {
        document.querySelectorAll(this.selectors.letter).forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add(this.classes.visible);
            }, index * 100);
        });
    }
}