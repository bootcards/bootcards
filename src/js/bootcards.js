var bootcards = bootcards || {};

bootcards._isXS = null;

/*
 * Get the Bootstrap enviroment we're in.
 * Found at http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api/15150381#15150381
 * Function writen by Raphael_ (http://stackoverflow.com/users/1661358/raphael)
 */
bootcards.findBootstrapEnvironment = function() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envValues = ["xs", "sm", "md", "lg"];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        $el.addClass('hidden-'+envVal);
        if ($el.is(':hidden')) {
            $el.remove();
            return envs[i];
        }
    }
};

bootcards.isXS = function() {
    if (this._isXS === null ) {
        this._isXS = (this.findBootstrapEnvironment() == "ExtraSmall");
    }
    return this._isXS;
};

/*
 * Disable rubberbanding effect in iOS.
 * Based on the 'Baking Soda Paste' technique written by Armagan Amcalar at
 * http://blog.armaganamcalar.com/post/70847348271/baking-soda-paste
 */
bootcards.disableRubberBanding = function() {
   document.body.addEventListener('touchstart', function() {
        document.body.addEventListener('touchmove', function moveListener(e) {
            document.body.removeEventListener('touchmove', moveListener);

            var el = e.target;

            do {

                var h = parseInt(window.getComputedStyle(el, null).height, 10);
                var sH = el.scrollHeight;

                if (h < sH) {
                    return;
                }
            } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

            e.preventDefault();
        });
    });

};

/*
 * Initialize an off-canvas menu. This takes 4 arguments:
 * - the element used to toggle the off canvas menu
 * - the off canvas element to slide in
 * - the main content area to push away when the off canvas element slides in
 * - a boolean indicating if the off canvas menu should be hidden when the main content area is clicked
 * 
 * An off canvas menu is required for the portrait-single-pane mode
 *
 */
bootcards.initOffCanvasMenu = function(offCanvasToggleEl, offCanvasMenuEl, mainContentEl, hideOnMainClick) {

    this.offCanvasToggleEl = offCanvasToggleEl;
    this.offCanvasMenuEl = offCanvasMenuEl;
    this.mainContentEl = mainContentEl;

    offCanvasToggleEl.on("click", function() {
      bootcards.offCanvasMenuEl.toggleClass("active");
      if (bootcards.mainContentEl) { bootcards.mainContentEl.toggleClass("active-left"); }
    });

    //hide the offcanvas if you click on the body
    if (hideOnMainClick && this.mainContentEl) {
        this.mainContentEl.on("click", function() {
            var $this = $(this);
            if ($this.hasClass('active-left') ) {
                $this.removeClass('active-left');
                bootcards.offCanvasMenuEl.removeClass('active');
            }

        });
    }

};

//hide the offcanvas menu
bootcards.hideOffCanvasMenu = function() {

    this.offCanvasMenuEl.removeClass('active');
    this.mainContentEl.removeClass('active');

};

