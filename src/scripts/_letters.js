let defaults = {
    $element: undefined,
    selectors: {
        letter: '.letters__wobble',
    },
    classes: {
        visible: 'letters__wobble--visible',
        rubberHero: 'letters__wobble--hero--rubber',
        rubber: 'letters__wobble--rubber'
    },
    settings: {
        homePage: false
    }
};

export default class Letters {
    constructor() {
        this.$element = defaults.$element;
        this.selectors = defaults.selectors;
        this.classes = defaults.classes;
        this.settings = defaults.settings;
    }

    init() {
        if (window.location.pathname === '/') {
            this.settings.homePage = true;
            setTimeout(() => {
                this.showLetters();
            }, 2200);
        } else {
            this.settings.homePage = false;
            this.showLetters();
        }
    }
    
    showLetters() {
        // document.querySelectorAll(this.selectors.letter).forEach((letter, index) => {
        //     setTimeout(() => {
        //         letter.classList.add(this.classes.visible);
        //     }, index * 100);
        // });

        let promise = Promise.resolve();

        document.querySelectorAll(this.selectors.letter).forEach((letter, index) => {
            promise = promise.then(() => {
                letter.classList.add(this.classes.visible);
                return new Promise((resolve) => {
                  setTimeout(resolve, 100);
                });
            });
        });

        promise.then(() => {
            this.animateLetters();
        });
    }

    animateLetters() {
        const length = document.querySelectorAll(this.selectors.letter).length - 1;
        const letter1 = Math.floor(Math.random() * length);
        const letter2 = Math.floor(Math.random() * length);
        const letter3 = Math.floor(Math.random() * length);
        
        const letters = document.querySelectorAll(this.selectors.letter);

        letters[letter1].classList.add(this.settings.homePage ? this.classes.rubberHero : this.classes.rubber);
        letters[letter2].classList.add(this.settings.homePage ? this.classes.rubberHero : this.classes.rubber);
        letters[letter3].classList.add(this.settings.homePage ? this.classes.rubberHero : this.classes.rubber);
    }
}