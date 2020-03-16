var contactPageController = (function() {
    
    function setEventListners() {

        var DOM = UIController.getDOMStrings();

        $(DOM.submitInfoBtn).on("click", function(event) {
            event.preventDefault();

            UIController.getContactInput();
        });

        $(DOM.infoBtn).on("click", function() {
          UIController.showModal(DOM.disclaimer);
        });

        $(DOM.closeModal).on("click", function() {
          UIController.hideModal(this);
      });
    }


    return {
        init: function () {
            setEventListners();
        }
    }
})();

function onjQueryLoaded() {
    generalFunctions.loadScript("/js/UI.js", contactPageController.init);
}

function loadAllScripts() {
    generalFunctions.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", onjQueryLoaded);
}

window.addEventListener("load", loadAllScripts);