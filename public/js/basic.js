function onUIControllerLoaded() {
  var DOM = UIController.getDOMStrings();

  $(DOM.infoBtn).on("click", function() {
    UIController.showModal(DOM.disclaimer);
  });

  $(DOM.closeModal).on("click", function() {
    UIController.hideModal(this);
});
}

function onjQueryLoaded() {
    generalFunctions.loadScript("/js/UI.js", onUIControllerLoaded);
}

function loadAllScripts() {
    generalFunctions.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", onjQueryLoaded);
}

window.addEventListener("load", loadAllScripts);