export function texteffect() {

    // console.log('texteffect');

    const elm ="<h1>";
    const area = $('.copy');
    const txt = "This is asaco's portfolio page. I seek for , create and DO something interesting."
    var spltxt = txt.split('');

    for (var i=0; i<spltxt.length; i++) {
        var picktxt = spltxt[i];
        area.append(elm);
        if (picktxt.match(/\s/)) {
            $('.copy').append('<span>');
        } else {
            $('.copy h1').eq(i).text(picktxt);
        }
    }

    let n = 0;
    const copy = $('.copy')
    const mainimg = $('#geo')
    const content = $('#glcanvas')

    const int = setInterval(() => {

        var num = Math.floor(Math.random() * spltxt.length);
        var pickstr = $('.copy h1').eq(num);
        if (pickstr.hasClass('colored')) {
            pickstr.removeClass('colored');
        } else {
            pickstr.addClass('colored')
        }
        
        n++;

        if(n > 35){
            clearInterval(int);

            // content.show();
            setTimeout(() => {
                mainimg.fadeIn(3000);
                // mainimg.show();
            }, 500);

            setTimeout(() => {
                copy.fadeOut(1000);
            }, 5000);
        }
    }, 100);

}