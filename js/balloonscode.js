$(function(){
    //Decide the birthdayAnimation - should be a random attentionSeeker
    birthdayAnimation = attentionSeekers[Math.floor((Math.random()) * attentionSeekers.length)];
    //Set the h1 animation to the birthdayAnimation

    $("h1:first-child").addClass("animate__" + birthdayAnimation);

    $('#birthday').pickadate({ format: 'mmmm, d' });

    // uncheck all checkboxes (FireFox)
    $('.form-check-input').each(function () {
        $(this).prop('checked', false);
    });

    // event listener for check/uncheck
    $('.form-check-input').on('change', function () {
        // make the image visible
        $('#' + this.id + 'Img').css('visibility', 'visible')
        // animate balloon in/out based on checkbox
        $(this).is(':checked') ?
         $('#' + this.id + 'Img').removeClass().addClass('animate__animated animate__bounceInDown') :
         $('#' + this.id + 'Img').addClass('animate__animated animate__bounceOutUp');
    });

    // check if the user tries to submit the form without choosing balloons
    $("#submit").on("click",function(event){
        //When the user tries to submit the form...
        //Prevent default
        event.preventDefault();
        //Check if the user has checked any balloons
        //The elements to check
        let checkboxes = $("input[name='fav-balloons']");
        //If none are checked...
        let anyChecked = false;
        for(let c of checkboxes){
            if($(c).is(":checked")){
                anyChecked = true;
                return;
            }
        }
        //Show the toast
        $("#balloonToast").toast({autohide: false}).toast("show");
        console.log(checkboxes);
    });

    // either select all or clear selection of balloons
    $(".balloonButton").on("click",function(event){
        event.preventDefault();
        //Save the target
        let button = event.target;
        //Save the balloon checkboxes
        let checkboxes = $("input[name='fav-balloons']");
        //Check what to set checked to
        let isChecked = $(button).data('action') === 'select-all-balloons' ? true : false;
        for(let c of checkboxes){
            $(c).prop('checked',isChecked);
        }
        updateBalloonAnimations();
    });

    //Listener for hovering over the checkboxes
    $(".form-check-input").on("mouseover",function(event){
        changeH1Color(event, "id");
    });

    //Listener for hovering over the labels
    $(".form-check-label").on("mouseover",function(event){
        changeH1Color(event, "for");
    });

    //Listener for when they stop hovering over the checkboxes
    $(".form-check-input").on("mouseout",h1ColorDefault);

    //Listener for when they stop hovering over the labels
    $(".form-check-label").on("mouseout",h1ColorDefault);
});

//Function to add/remove animations to the balloons
function updateBalloonAnimations(){
    //Cycle through the checkboxes
    let checkboxes = $("input[name='fav-balloons']");
    for(let c of checkboxes){
        // animate balloon in/out based on checkbox
        $(c).is(':checked') ?
         $('#' + c.id + 'Img').removeClass().addClass('animate__animated animate__bounceInDown') :
         $('#' + c.id + 'Img').addClass('animate__animated animate__bounceOutUp');
    }
}

//Attention seeker animations
let attentionSeekers=["bounce","flash","pulse","rubberBand","shakeX","shakeY","headShake","swing","tada","wobble","jello","heartBeat"];

let colors={
    default: "slategray",
    black: "#000000",
    "blue-green": "#007979",
    blue: "#0000CC",
    brown: "#5D3404",
    green: "#00CB00",
    orange: "#FA4400",
    pink: "#FEB1F7",
    purple: "#9011C2",
    red: "#C40000",
    silver: "#535252",
    white: "#FFFFFF",
    yellow: "#FFFF00"
}

//Change the h1 color to the color of the label/checkbox being hovered over
function changeH1Color(event, attr){
    let color = $(event.target).attr(attr);
        $("h1").css('color',colors[color]);
}

//Restore h1 to default color
function h1ColorDefault(){
    $("h1").css('color',colors["default"]);
}