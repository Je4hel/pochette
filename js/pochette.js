var pochetteApp = angular.module("pochetteApp", []);

pochetteApp.controller("linksCtrl", function($scope) 
{
    var links;
    $scope.links = links = [];
    
    $scope.Init = function () {
        $scope.newLink = newLink = {
            title: "",
            description: "",
            url: "",
            date: ""
        };
        
        links = LoadFromLocalStorage();
        if (links === null) {
            DisplayNavAlert("Aucun lien !", "Aucun lien n'a pu être récupéré :-(", "danger", 3000);
            links = [];
        }
        $scope.links = links;
    }
    
    $scope.AddNewLink = function () {
        if (newLink.url !== "") {
            newLink.date = GetCurrentShortDate();
            $scope.links.push(angular.copy(newLink));
            $("#addLinkModal").modal("hide");
            $scope.newLink = newLink = {};
            SaveToLocalStorage(links);
        }
    }
})

var GetCurrentShortDate = function () {
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10) ? "0" + month : month;
    var day = date.getDate();
    day = (day < 10) ? "0" + day : day;
    return day + "." + month + "." + date.getFullYear();
}

var SaveToLocalStorage = function (data) {
    localStorage.setItem("pochette-links", JSON.stringify(data));
    
    var message = data.length + " liens viennent d'être sauvegardé avec succès";
    if (data.length === 1)
        message = "1 lien vient d'être sauvegardé avec succès";
    
    DisplayNavAlert("Sauvegarde réussie", message, "success", 3000);
}

var LoadFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem("pochette-links"));
}

var DisplayNavAlert = function (title, message, type, duration) {
    var alertSpan = $("#navbar-alert span.alert");
    $(alertSpan).removeClass()
        .addClass("alert alert-" + type)
        .html("<strong>" + title + "</strong>&nbsp;" + message);
    
    if (!(duration > 0)) {
        $(alertSpan).append("<span aria-hidden=\"true\" class=\"close-icon\">&times;</span>");
        $(alertSpan).find(".close-icon").click(ToggleNavAlert);
    } 
    
    if ($(alertSpan).parent(".container-fluid").hasClass("hidden"))
        ToggleNavAlert();

    if (duration > 0)
        setTimeout(ToggleNavAlert, duration);
}

var ToggleNavAlert = function () {
    $("nav .container-fluid:not(.hidden)").animate({
        opacity: 0
    }, 700, function () {
        $(this).addClass("hidden");
    });
    
    $("nav .container-fluid.hidden").animate({
        opacity: 1
    }, 701, function () {
        $(this).removeClass("hidden");
    });
}