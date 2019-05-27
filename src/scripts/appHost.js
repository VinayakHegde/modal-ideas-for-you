import '../styles/appHost.scss';
import classie from 'classie';

class AppHost extends HTMLElement {
    /**
     * A custom element can define special lifecycle hooks for running code during interesting times of its existence. 
     * These are called custom element reactions.
     */
    
    constructor() {
        /**
         * An instance of the element is created or upgraded. 
         * Useful for initializing state, settings up event listeners, or creating shadow dom. 
         * See the spec (https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance) for restrictions on what you can do in the constructor.
         */
        // always call super() first in the constructor.
        super(); 
    }
   
    connectedCallback() {
        /**
         * Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. 
         * Generally, you should try to delay work until this time.
         */
        const overlay = this.querySelector( '.overlay' ),
            modal = this.querySelector( '#modal');
        
        let effect = '',
            hasPerspective = false;

        function removeModalHandler( ) {
            classie.remove( modal, 'show' );
            setTimeout( function() {
                classie.remove( modal, effect );
                if( hasPerspective ) {
                    classie.remove( document.documentElement, 'perspective' );
                }
            }, 250);
        }

        this.addEventListener( 'click', function( ev ) {
            if(classie.has( ev.target, 'close' )){
                ev.stopPropagation();
                removeModalHandler();
                return;
            }
            effect = 'effect-'+ ev.target.getAttribute( 'data-effect' );
            hasPerspective = classie.has( ev.target, 'setperspective' );

            classie.add( modal, effect); 
            
            overlay.removeEventListener( 'click', removeModalHandler );
            overlay.addEventListener( 'click', removeModalHandler);
            
            setTimeout( function() {
                if( hasPerspective ) {
                    classie.add( document.documentElement, 'perspective' );
                }
                classie.add( modal, 'show' );
            }, 250 );
        });

    }
    disconnectedCallback() {
        /**
         * Called every time the element is removed from the DOM. Useful for running clean up code.
         */
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        /**
         * Called when an observed attribute has been added, removed, updated, or replaced. 
         * Also called for initial values when an element is created by the parser, or upgraded. 
         * Note: only attributes listed in the observedAttributes property will receive this callback.
         */
    }
    adoptedCallback(){
        /**
         * 	The custom element has been moved into a new document (e.g. someone called document.adoptNode(el))
         */
    }
}

window.customElements.define('app-host', AppHost);