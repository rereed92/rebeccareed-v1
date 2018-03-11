let defaults = {
    selectors: {
        map: '.map'
    },
    classes: {
    }
};

export default class Map {
    constructor() {
        this.selectors = defaults.selectors;
        this.classes = defaults.classes;
    }

    initMap() {
        console.log('contact me');

        const uluru = {lat: -25.363, lng: 131.044};
        const map = new google.maps.Map(document.querySelector(this.selectors.map), {
          zoom: 4,
          center: uluru
        });
        const marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
    }
}