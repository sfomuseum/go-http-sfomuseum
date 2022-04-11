window.addEventListener("load", function load(event){

    // START OF remove CSS triggers to make mobile menu expand/collapse                                                                                     

    var el = document.getElementById("navbar-container-collection");

    if (el){
        el.removeAttribute("id");
    }

    // END OF remove CSS triggers to make mobile menu expand/collapse                                                                                       

    // START OF expanding/collapsing search widget on mobile                                                                                                

    var loop = document.getElementById("navbar-search-collection-loop");
    var form = document.getElementById("navbar-search-collection-mobile");

    if ((loop) && (form)){

        loop.onclick = function(){

            if (form.style.display == "block"){
		form.style.display="none";
            } else {
                form.style.display="block";
            }

        };
    }

    // END OF expanding/collapsing search widget on mobile 
});
