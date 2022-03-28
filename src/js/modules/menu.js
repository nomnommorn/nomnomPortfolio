export function menu() {
    
    // console.log('menu func')

    // --- Menu Display func
    const targetarea = $('#menuwrap')
    const arw = $('.downarw')
    var menu = $('#menu')

    targetarea.hover( ()=> {
        // console.log('OVER')
        arw.hide();
        menu.fadeIn(300);
    }, ()=> {
        // console.log('LEFT')
        menu.hide();
        arw.fadeIn(300);
    });

    // --- display elements
    const top = $("#top")
    top.show();
    // const menu = $("#menu a")
    // var clickedmenu = $("#menu a").href
    // menu.on('clicked', () => {
    //     console.log(this.href);
    // })
    
}
