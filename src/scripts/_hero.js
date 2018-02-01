let defaults = {
    $element: undefined,
    selectors: {
        letter: '.hero__wobble',
        subheading: '.hero__subheading'
    },
    classes: {
        visible: 'hero__wobble--visible',
        display: 'hero__subheading--display'
    }
};

export default class Hero {
    constructor() {
        this.$element = defaults.$element;
        this.selectors = defaults.selectors;
        this.classes = defaults.classes;
    }

    init() {
        setTimeout(() => {
            this.showLetters();
        }, 1200);

        // setTimeout(() => {
        //     this.showSubheading();
        // }, 2200);
    }
    
    showLetters() {
        document.querySelectorAll(this.selectors.letter).forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add(this.classes.visible);
            }, index * 100);
        });
    }

    showSubheading() {
        document.querySelector(this.selectors.subheading).classList.add(this.classes.display);
    }
}