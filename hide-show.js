/*! Simple and Accessible Hide/Show toggle behavior
 * Copyright Whatever Year It is Tim Wright
 * Licensed under MIT
 * Repo: https://github.com/timwright12/hideshow/
 * Pen: http://codepen.io/timwright12/pen/yerzqG
 *
 * HTML example usage:

 * <button
 *    type="button"
 *    data-action="hide-show"
 *    data-text="Hide"
 *    data-class="is-hidden"
 *    aria-controls="worms"
 *    aria-live="polite"
 *    aria-expanded="false">
 *    Show
 * </button>
 *
 * <div id="worms"></div>
 */

;(function (w, doc) {

  // Enable strict mode
  "use strict";

  // Local object for method references
  var HideShow = {};

  // Namespace
  HideShow.ns = "Hide/Show Trigger onClick";

  /*
    Check if an element is hidden (display: none OR visibility: hidden)
  */

  HideShow.isHidden = function(el) {
    return (el.offsetParent === null);
  };

  /*
    Cross-browser way to tell if an element has a certain class
  */

  HideShow.hasClass = function(el, cls) {
    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return !!el.cls.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
  };

  /*
    Cross-browser wat to remove a class
  */

  HideShow.removeClass = function(el, cls) {
    if (el.classList) {
      el.classList.remove(cls);
    } else if (HideShow.hasClass(el, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      el.cls=el.cls.replace(reg, ' ');
    }
  };

  /*
    Cross-browser way to add a class
  */

  HideShow.addClass = function(el, cls) {
    if (el.classList) {
      el.classList.add(cls);
    } else if (!HideShow.hasClass(el, cls)) {
      el.cls += " " + cls;
    }
  };

  /*
    Internal method of bringing a target element into view
  */

  HideShow.displayEl = function( self, el ) {
    self.setAttribute('aria-expanded', true);
    el.setAttribute('tabindex', '-1');
    el.focus();
  };

  /*
    Internal method of removing an element from view
  */

  HideShow.removeEl = function( self, el ) {
    el.removeAttribute('tabindex');
    self.setAttribute('aria-expanded', false);
  };

  /*
    Master toggle method for hiding and showing content
  */

  HideShow.toggle = function(self, target, text, replaceText, expanded, className ) {

    var tgtEl = doc.getElementById(target);
    var elem = doc.getElementById(tgtEl);
    var CSSdisplay = w.getComputedStyle(tgtEl, null).getPropertyValue("display");

    if( replaceText ) {
      self.innerHTML = replaceText;
      self.setAttribute('data-text', text);
    }

    // If a class will be used to hide the element and it's not setting display: none
    if( className && CSSdisplay !== 'none' ) {

      // if the target element already contains the chosen class
      if( this.hasClass( tgtEl, className )) {

        // YES: remove it, and display the elememt
        this.removeClass( tgtEl, className );
        this.displayEl( self, tgtEl );

      } else {

        // NO: Add it, and hide the element
        this.addClass( tgtEl, className);
        this.removeEl( self, tgtEl );

      } // if hasClass

    // classes are being used to hide/show, but it's setting display: none
    } else if( className && CSSdisplay === 'none' ) {

      if( this.hasClass( tgtEl, className )) {

        this.removeClass( tgtEl, className );
        this.displayEl( self, tgtEl );
        tgtEl.setAttribute('aria-hidden', true);

      // no classes being used
      } else {

        this.addClass( tgtEl, className);
        this.removeEl( self, tgtEl );
        tgtEl.removeAttribute('aria-hidden');

      }

    } else {

      // If the target element is being displayed
      if( !this.isHidden( tgtEl ) ) {

        // special additions for this style of hiding
        tgtEl.style.display = 'none';
        tgtEl.setAttribute('aria-hidden', true);

        // YES: hide it
        this.removeEl( self, tgtEl );

      } else {

        // special additions for this style of hiding
        tgtEl.removeAttribute('style');
        tgtEl.removeAttribute('aria-hidden');

        // NO: show it
        this.displayEl( self, tgtEl );

      } // if el is hidden

    } // if className

  }; // HideShow.toggle();

  // Start defining methods here
  HideShow.init = function() {

    var btns = doc.querySelectorAll('[data-action="hide-show"]');
    var btnsCount = btns.length;
    var i, text, replaceText, target, className, expanded;

    if( btnsCount > 0 ) {
      for (i = 0; i < btnsCount; i = i + 1) {

        var obj = btns[i];

        obj.addEventListener('click', function(e) {

          // pulling out some DOM elements
          text = this.innerText || this.textContent;
          replaceText = this.getAttribute('data-text');
          target = this.getAttribute('aria-controls');
          className = this.getAttribute('data-class');
          expanded = this.getAttribute('aria-expanded');

          // just in case it's a link, but it should be a button
          e.preventDefault();

          // calling the toggle
          HideShow.toggle(this, target, text, replaceText, expanded, className);

        }); // click

      } // loop buttons
    } // if buttons

  };

  // Start the application
  HideShow.init();

} )( this, this.document );
