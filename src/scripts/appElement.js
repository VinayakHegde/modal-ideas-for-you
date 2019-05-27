import '../styles/appElement.scss';

class AppElement extends HTMLElement {
    constructor() {
        // always call super() first in the constructor.
        super(); 
    }
}

window.customElements.define('app-element', AppElement);