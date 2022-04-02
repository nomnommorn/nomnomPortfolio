export function menu() {
    
    // console.log('menu func')

    // --- Menu Display func
    const targetarea = $('#menuwrap')
    const arw = $('#menuarea .downarw')
    const menu = $('#menu')

    // for PC
    var windowWidth = window.innerWidth;
    if(windowWidth >= 601){
        targetarea.hover( ()=> {
            if(targetarea.hasClass('opened') != true){
                arw.hide();
                menu.fadeIn(300);
                targetarea.addClass('opened');
            } else {
                menu.hide();
                arw.fadeIn(300);
                targetarea.removeClass('opened')
            };
        });
    }

    // for SP
    arw.click(() => {
        if (targetarea.hasClass('opened') != true) {
            arw.removeClass('rotate_re');
            arw.addClass('rotate');
            menu.fadeIn(300);
            targetarea.addClass('opened');
        } else {
            menu.hide();
            arw.removeClass('rotate');
            arw.addClass('rotate_re');
            targetarea.removeClass('opened')
        }
    });

    // --- display elements
    // const top = $("#top");

    // const insideCont = $('.inside .elements');
    // top.show();
    
    // const link = $("#menu li")
    // link.on('click', (e)=> {
    //     insideCont.hide();
    //     var loc = $(e.target).data('target');
    //     var target_loc = $(loc);
    //     target_loc.fadeIn(500);
    // })
    
}
