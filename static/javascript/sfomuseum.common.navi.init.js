window.addEventListener("load", function load(event){

    /*

      this is what disables the no-JS-show-the-hamburger-menu CSS selectors
      in sfomuseum.collection.css - if this is being invoked then we assume
      JS is... enabled.

    */

    var el = document.getElementById("navbar-container-sfomuseum");

    if (el){
	el.removeAttribute("id");
    }

});
