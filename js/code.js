$(function(){
    //preload audio
    var toast = new Audio('media/toast.wav');
    $('.code').on('click', function(e) {
        e.preventDefault();
        // first pause the audio (in case it is still playing)
        toast.pause();
        // reset the audio
        toast.currentTime = 0;
        //Set the product name for the toast
        $('#toast .toast-header #product').text($(e.target).data("item"));
        //Set the coupon code for the toast
        $('#toast #code').text($(e.target).data("code"));
        //play audio
        toast.play();
        $('#toast').toast({ autohide: false }).toast('show');
    });

        //If the user presses the escape key
        $(document).keydown(function(event){
            let code = event.which;
            if(code === 27){
                //The escape key was pressed - ASCII code for ESC key is 27
                //Close the toast -- make sure it has the autohide off still
                $('#toast').toast({autohide: false}).toast('hide');
            }
        });
});