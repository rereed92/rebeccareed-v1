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
                  setTimeout(resolve, index * 100);
                });
            });
        });

        promise.then(function () {
            console.log('Loop finished.');
        });
    }
}


// var array = ['some', 'array', 'containing', 'words'];
// var interval = 1000; // how much time should the delay between two iterations be (in milliseconds)?
// var promise = Promise.resolve();
// array.forEach(function (el) {
//   promise = promise.then(function () {
//     console.log(el);
//     return new Promise(function (resolve) {
//       setTimeout(resolve, interval);
//     });
//   });
// });

// promise.then(function () {
//   console.log('Loop finished.');
// });