$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){

          //Create Index Bar
          $.each(data.omicron, function(position, oMICRON){
           $('.indexBar').append('<div class="current">' + position + '</div>');
          });

          var i = 0;
          appendDom();
          tracker();
          var stopper = setInterval(timer, 10000);

          //Function that tracks the currently displayed comment.
          function tracker() {
           $('.tracker').removeClass('tracker');
           $('.current').eq(i).addClass('tracker');
          }//tracker

          //Function that appends current comment on the DOM
          function appendDom() {
           var $el = $('.ajax-data');
           var balerion = data.omicron[i];
           $('.ajax-data').fadeOut("slow", function(){
           $('.ajax-data').children().remove();
           $el.append('<h1>' + balerion.name + '</h1>');
           $el.append('<h2>' + balerion.git_username + '</h2>');
           $el.append('<p>' + balerion.shoutout + '</p>');
           $('.ajax-data').fadeIn("slow");
          })
         }//appendDom

          //Function that empties the DOM
          function emptyDom(){
           $('.ajax-data').empty();
         } //emptyDom

         //Ensure that current position doesn't increment over or decrement below
         //omicron array elements
         function checkPosition(){
           if (i > (data.omicron.length - 1)) {
             i = 0;
           } else if (i < 0) {
             i = (data.omicron.length - 1);
           }
         }

          //Previous button function that when clicked, displays the last comment.
          $('#previous').on('click', function(){
           i--;
           checkPosition();
           emptyDom();
           appendDom();
           tracker();
        });//Previous Button

          //Next button function that when clicked, displays the next comment.
          $('#next').on('click', function(){
           i++;
           checkPosition();
           emptyDom();
           appendDom();
           tracker();
           reset();
          });//Next Button



         //Reset Timer Function
         function reset(){
           clearTimeout(stopper);
           stopper = setInterval(timer, 10000);
         }

        //FIX TIMER FUNCTION
        function timer() {
         i++;
         checkPosition();
         appendDom();
         tracker();
      }//Timer Function

      }//Data
    });
});
