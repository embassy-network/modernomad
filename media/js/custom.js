var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
        cropThat(img);
    }
    reader.readAsDataURL(e.target.files[0]);
}

function cropThat(image){
    var iMouseX, iMouseY = 1;
    var theSelection;

    // define Selection constructor
    function Selection(x, y, w, h){
        this.x = x; // initial positions
        this.y = y;
        this.w = w; // and size
        this.h = h;

        this.px = x; // extra variables to dragging calculations
        this.py = y;

        this.csize = 6; // resize cubes size
        this.csizeh = 10; // resize cubes size (on hover)

        this.bHow = [false, false, false, false]; // hover statuses
        this.iCSize = [this.csize, this.csize, this.csize, this.csize]; // resize cubes sizes
        this.bDrag = [false, false, false, false]; // drag statuses
        this.bDragAll = false; // drag whole selection
    }

    // define Selection draw method
    Selection.prototype.draw = function(){

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        // draw part of original image
        if (this.w > 0 && this.h > 0) {
            ctx.drawImage(image, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
        }

        // draw resize cubes
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x - this.iCSize[0], this.y - this.iCSize[0], this.iCSize[0] * 2, this.iCSize[0] * 2);
        ctx.fillRect(this.x + this.w - this.iCSize[1], this.y - this.iCSize[1], this.iCSize[1] * 2, this.iCSize[1] * 2);
        ctx.fillRect(this.x + this.w - this.iCSize[2], this.y + this.h - this.iCSize[2], this.iCSize[2] * 2, this.iCSize[2] * 2);
        ctx.fillRect(this.x - this.iCSize[3], this.y + this.h - this.iCSize[3], this.iCSize[3] * 2, this.iCSize[3] * 2);
    }

    function drawScene() { // main drawScene function
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

        // draw source image
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

        // and make it darker
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw selection
        theSelection.draw();
    }

    $(function(){

        // creating canvas and context objects
        ctx = canvas.getContext('2d');

        // create initial selection
        theSelection = new Selection(50, 50, 50, 50);

        $('#imageCanvas').mousemove(function(e) { // binding mouse move event
            var canvasOffset = $(canvas).offset();
            iMouseX = Math.floor(e.pageX - canvasOffset.left);
            iMouseY = Math.floor(e.pageY - canvasOffset.top);

            // in case of drag of whole selector
            if (theSelection.bDragAll) {
                theSelection.x = iMouseX - theSelection.px;
                theSelection.y = iMouseY - theSelection.py;
            }

            for (i = 0; i < 4; i++) {
                theSelection.bHow[i] = false;
                theSelection.iCSize[i] = theSelection.csize;
            }

            // hovering over resize cubes
            if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh &&
                iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {

                theSelection.bHow[0] = true;
                theSelection.iCSize[0] = theSelection.csizeh;
            }
            if (iMouseX > theSelection.x + theSelection.w-theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh &&
                iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {

                theSelection.bHow[1] = true;
                theSelection.iCSize[1] = theSelection.csizeh;
            }
            if (iMouseX > theSelection.x + theSelection.w-theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh &&
                iMouseY > theSelection.y + theSelection.h-theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {

                theSelection.bHow[2] = true;
                theSelection.iCSize[2] = theSelection.csizeh;
            }
            if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh &&
                iMouseY > theSelection.y + theSelection.h-theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {

                theSelection.bHow[3] = true;
                theSelection.iCSize[3] = theSelection.csizeh;
            }

            // in case of dragging of resize cubes
            var iFW, iFH;
            if (theSelection.bDrag[0]) {
                var iFX = iMouseX - theSelection.px;
                var iFY = iFX;
                iFW = theSelection.w + theSelection.x - iFX;
                iFH = iFW;
            }
            if (theSelection.bDrag[1]) {
                var iFX = theSelection.x;
                var iFY = iMouseY - theSelection.py;
                iFW = iMouseX - theSelection.px - iFX;
                iFH = iFW;
            }
            if (theSelection.bDrag[2]) {
                var iFX = theSelection.x;
                var iFY = theSelection.y;
                iFW = iMouseX - theSelection.px - iFX;
                iFH = iFW;
            }
            if (theSelection.bDrag[3]) {
                var iFX = iMouseX - theSelection.px;
                var iFY = theSelection.y;
                iFW = theSelection.w + theSelection.x - iFX;
                iFH = iFW;
            }

            if (iFW > theSelection.csizeh * 2 && iFH > theSelection.csizeh * 2) {
                theSelection.w = iFW;
                theSelection.h = iFH;

                theSelection.x = iFX;
                theSelection.y = iFY;
            }

            drawScene();
        });

        $('#imageCanvas').mousedown(function(e) { // binding mousedown event
            var canvasOffset = $(canvas).offset();
            iMouseX = Math.floor(e.pageX - canvasOffset.left);
            iMouseY = Math.floor(e.pageY - canvasOffset.top);

            theSelection.px = iMouseX - theSelection.x;
            theSelection.py = iMouseY - theSelection.y;

            if (theSelection.bHow[0]) {
                theSelection.px = iMouseX - theSelection.x;
                theSelection.py = iMouseY - theSelection.y;
            }
            if (theSelection.bHow[1]) {
                theSelection.px = iMouseX - theSelection.x - theSelection.w;
                theSelection.py = iMouseY - theSelection.y;
            }
            if (theSelection.bHow[2]) {
                theSelection.px = iMouseX - theSelection.x - theSelection.w;
                theSelection.py = iMouseY - theSelection.y - theSelection.h;
            }
            if (theSelection.bHow[3]) {
                theSelection.px = iMouseX - theSelection.x;
                theSelection.py = iMouseY - theSelection.y - theSelection.h;
            }

            if (iMouseX > theSelection.x + theSelection.csizeh && iMouseX < theSelection.x+theSelection.w - theSelection.csizeh &&
                iMouseY > theSelection.y + theSelection.csizeh && iMouseY < theSelection.y+theSelection.h - theSelection.csizeh) {

                theSelection.bDragAll = true;
            }

            for (i = 0; i < 4; i++) {
                if (theSelection.bHow[i]) {
                    theSelection.bDrag[i] = true;
                }
            }
        });

        $('#imageCanvas').mouseup(function(e) { // binding mouseup event
            theSelection.bDragAll = false;

            for (i = 0; i < 4; i++) {
                theSelection.bDrag[i] = false;
            }
            theSelection.px = 0;
            theSelection.py = 0;
        });

        drawScene();
    });

    cropThat.getResults = function() {
        var temp_ctx, temp_canvas;
        temp_canvas = document.createElement('canvas');
        temp_ctx = temp_canvas.getContext('2d');
        temp_canvas.width = theSelection.w;
        temp_canvas.height = theSelection.h;
        temp_ctx.drawImage(image, theSelection.x, theSelection.y, theSelection.w, theSelection.h, 0, 0, theSelection.w, theSelection.h);
        var vData = temp_canvas.toDataURL();
        $('#crop_result').attr('src', vData);

        // if using the client side decoding below add these lines back in
        //
        // vData = vData.match(/data:image\/(png|jpeg);base64,(.*)$/)[2];
        // vData = cropThat.decode_base_64(vData);

        $('#id_image').val(vData);
    }


    // //////////////////////////////////////////
    // this is not being used right now
    // if the decoding needs to be server side
    // this can decode the image from base64
    // //////////////////////////////////////////
    // cropThat.decode_base_64 = function(input) {
    //     var keyStr = "ABCDEFGHIJKLMNOP" +
    //        "QRSTUVWXYZabcdef" +
    //        "ghijklmnopqrstuv" +
    //        "wxyz0123456789+/" +
    //        "=";

    //     var output = "";
    //     var chr1, chr2, chr3 = "";
    //     var enc1, enc2, enc3, enc4 = "";
    //     var i = 0;

    // // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    //     var base64test = /[^A-Za-z0-9\+\/\=]/g;
    //     if (base64test.exec(input)) {
    //         alert("There were invalid base64 characters in the input text.\n" +
    //             "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
    //             "Expect errors in decoding.");
    //     }
    //     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    //     do {
    //         enc1 = keyStr.indexOf(input.charAt(i++));
    //         enc2 = keyStr.indexOf(input.charAt(i++));
    //         enc3 = keyStr.indexOf(input.charAt(i++));
    //         enc4 = keyStr.indexOf(input.charAt(i++));

    //         chr1 = (enc1 << 2) | (enc2 >> 4);
    //         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    //         chr3 = ((enc3 & 3) << 6) | enc4;

    //         output = output + String.fromCharCode(chr1);

    //         if (enc3 != 64) {
    //            output = output + String.fromCharCode(chr2);
    //         }
    //         if (enc4 != 64) {
    //            output = output + String.fromCharCode(chr3);
    //         }

    //         chr1 = chr2 = chr3 = "";
    //         enc1 = enc2 = enc3 = enc4 = "";

    //     } while (i < input.length);

    //     return unescape(output);
    // }
}
