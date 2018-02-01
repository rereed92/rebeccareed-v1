let defaults = {
    $element: undefined,
    selectors: {
        link: '.loader__link',
        content: '.loader__content',
        cover: '.loader__cover'
    },
    classes: {
        contentLoading: 'loader__content--loading',
        showCover: 'loader__cover--display'
    },
    settings: {
        initialLoad: false,
        url: '',
    }
};

export default class Loader {
    constructor() {
        this.$element = defaults.$element;
        this.selectors = defaults.selectors;
        this.classes = defaults.classes;
        this.settings = defaults.settings;
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
                // this.showLoader();
            // console.log(this.settings.initialLoad);
        });

        // [].forEach.call(document.querySelectorAll(this.selectors.link), (link) => {
        //     link.addEventListener('click', (event) => {
        //         // event.preventDefault();
        //         // this.settings.url = event.target.href;
        //         if (this.settings.initialLoad) {
        //             this.showLoader();
        //             this.settings.initialLoad = true;
        //         }
        //     });
        // });
    }

    showLoader() {
        document.querySelector(this.selectors.cover).classList.add(this.classes.showCover);

        setTimeout(() => {
            document.querySelector(this.selectors.cover).classList.remove(this.classes.showCover);
            // window.location.href = this.settings.url;
        }, 3000);
    }
}