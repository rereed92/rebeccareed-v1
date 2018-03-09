console.log('hello');

import Letters from './_letters';
import Loader from './_loader';
import Timeline from './_timeline';

const letters = new Letters();
letters.init();

const loader = new Loader();
loader.init();

const timeline = new Timeline();
timeline.init();