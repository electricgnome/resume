

function materialize() {
 
  $(".tabs").tabs({});

  $(".tooltipped").tooltip();
  $(".sidenav").sidenav();
  $(".fixed-action-btn").floatingActionButton({
    direction: "left",
    hoverEnabled: false
  });

  $("input.counter").characterCounter();

  
}


$(window).on("load", function() {
  materialize();
  $(".collapsible").collapsible();

 
  });

