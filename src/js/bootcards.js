var bootcards = bootcards || {};

bootcards._isXS = null;


bootcards.init = function( options ) {

    $(document).ready( function() {

        //initialize the off canvas menu
        bootcards._initOffCanvasMenu(
          $('.offcanvas'),
          $('.bootcards-container'),
          options.offCanvasHideOnMainClick
        );

        if (options.enableTabletPortraitMode) {

           bootcards._initTabletPortraitMode();

        }

        if (options.disableRubberBanding) {

            bootcards.disableRubberBanding();
        }


    } );


};


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
 * Initialize an off-canvas menu. This takes 3 arguments:
 * - the off canvas element to slide in
 * - the main content area to push away when the off canvas element slides in
 * - a boolean indicating if the off canvas menu should be hidden when the main content area is clicked
 * 
 * An off canvas menu is required for the portrait-single-pane mode
 *
 */
bootcards._initOffCanvasMenu = function(offCanvasMenuEl, mainContentEl, hideOnMainClick) {

    var $toggleEl = $('[data-toggle=offcanvas]');

    if ($toggleEl.length===0 ) {
        return;
    }

    this.offCanvasToggleEl = $toggleEl;
    this.offCanvasMenuEl = offCanvasMenuEl;
    this.mainContentEl = mainContentEl;
    console.log(' k');

    this.offCanvasToggleEl.on("click", function() {
      bootcards.offCanvasMenuEl.toggleClass("active");
      if (bootcards.mainContentEl) { bootcards.mainContentEl.toggleClass("active-left"); }
    });

    //hide the offcanvas if you click on the body
    if (hideOnMainClick && bootcards.mainContentEl) {
        this.mainContentEl.on("click", function() {
            bootcards.offCanvasMenuEl.removeClass('active');
            var $this = $(this);
            if ($this.hasClass('active-left') ) {
                $this.removeClass('active-left');
            }

        });
    }

};

//hide the offcanvas menu
bootcards.hideOffCanvasMenu = function() {

    this.offCanvasMenuEl.removeClass('active');
    this.mainContentEl.removeClass('active');

};


bootcards._initTabletPortraitMode = function() {

    $(window)
        .on( 'orientationchange', function() { 
            setTimeout( function() { 
                bootcards._setOrientation(false);
            } , 200);
            event.stopPropagation();
        } )
        .on( 'load', bootcards._setOrientation(true) );

};

bootcards._setOrientation = function(init) {

    var isPortrait = (window.orientation===0 || window.orientation===180);

    if (isPortrait) {

        //get the columns classes for the list and details
        if (!bootcards.listEl) {
            
            bootcards.listEl = $('.bootcards-list');
            bootcards.listColClass = '';
            bootcards.listTitle = bootcards.listEl.data('title');

            $.each(bootcards.listEl.prop('class').split(' '), function(idx, value) {
                if (value.indexOf('col')===0) {
                    bootcards.listColClass += value + ' ';
                }
            });

        }

        //immediately hide the list on load in portrait mode
        if (init) {
            bootcards.listEl.hide();
        }

        if (!bootcards.cardsEl) {

            bootcards.cardsEl = $('.bootcards-cards');
            bootcards.cardsColClass = '';

            $.each(bootcards.cardsEl.prop('class').split(' '), function(idx, value) {
                if (value.indexOf('col')===0) {
                    bootcards.cardsColClass += value + ' ';
                }
            });

        }

        if (!bootcards.listOffcanvasToggle) {
            //create the list title & toggle elements

             //create the button that shows/hides the list
            bootcards.listOffcanvasToggle = $('<button type="button" class="btn btn-default pull-left offcanvaslist-toggle">' +
                '<i class="fa fa-lg fa-angle-left"></i><span>' + bootcards.listTitle + '</span>' +
                '</button>')
                    .on("click", function() {

                        //on click: show the list & title
                        bootcards.listEl.toggleClass("active");
                        bootcards.listTitleEl.toggleClass("active");
                
                    });

            //create the title element of the list offcanvas
            bootcards.listTitleEl = $("<div class='offcanvas-list offcanvas-list-title'>"  +
               "<span>" + bootcards.listTitle + "</span></div>");

            //create the title element for the menu offcanvas, insert it before the menu offcanvas
            bootcards.offCanvasMenuTitleEl = $("<div class='offcanvas-list offcanvas-list-title'>"  +
               "<span>Menu</span></div>");
            bootcards.offCanvasMenuEl.before( bootcards.offCanvasMenuTitleEl );

            //clone the button to show/hide the menu in the list title
            bootcards.offCanvasToggleEl.clone(false)
                .prependTo(bootcards.listTitleEl)
                .on("click", function() {
                    bootcards.offCanvasMenuEl.toggleClass("active");
                    bootcards.offCanvasMenuTitleEl.toggleClass("active");
                })
                .children("i")
                    .removeClass('fa-bars')
                    .addClass('fa-angle-left');

            //add the title element and the toggle button to the top navbar
           $('.navbar-header')
               .after(
                    bootcards.listTitleEl, bootcards.listOffcanvasToggle);   

            //hide the list & list title when to body is clicked
            bootcards.mainContentEl.on("click", function() {
                
                bootcards.listEl.removeClass('active');
                bootcards.listTitleEl.removeClass('active'); 
                bootcards.offCanvasMenuTitleEl.removeClass('active');

            });
            
            bootcards.listEl.on("click", function() {

                var $this = $(this);
                $this.removeClass('active');
                bootcards.listTitleEl.removeClass('active');

                //stop propagation when an element in the list offcanvas is clicked
                event.stopPropagation();

            });

            //increase the width of the menu: set it to the same size as the list
            bootcards.offCanvasMenuEl
                .addClass('offcanvas-list')
                .on("click", function() {

                    //hide the menu on click 

                    var $this = $(this);
                    $this.removeClass('active');
                    bootcards.offCanvasMenuTitleEl.removeClass('active');
                    bootcards.listEl.removeClass('active');
                    bootcards.listTitleEl.removeClass('active'); 

                    //stop propagation when an element in the list offcanvas is clicked
                    event.stopPropagation();

                });

        }

        //hide the menu button
        bootcards.offCanvasToggleEl.hide();

        //show the button to toggle the list
        bootcards.listOffcanvasToggle.show();

        bootcards.listEl
            .removeClass(bootcards.listColClass)
            .addClass('offcanvas-list')
            .show();

        //set the column to full width
        bootcards.cardsEl
            .removeClass(bootcards.cardsColClass)
            .addClass('col-xs-12');

    } else {

        //show the menu button
        bootcards.offCanvasToggleEl.show();

        //hide the button to show the list, remove the list & title
        if ( bootcards.listOffcanvasToggle ) {
            bootcards.listOffcanvasToggle.hide();
            bootcards.listTitleEl.removeClass("active");

            bootcards.listEl
                .removeClass('offcanvas-list active')
                .addClass(bootcards.listColClass);

            bootcards.cardsEl
                .removeClass('col-xs-12')
                .addClass( bootcards.cardsColClass );
        }


    }

};
