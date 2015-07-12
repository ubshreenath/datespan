/// <reference path="../typings/jquery/jquery.d.ts"/>
Modernizr.load({
    test: Modernizr.inputtypes.date,
    nope: ['../styles/jquery-ui.min.css', '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js'],
    complete: function () {
        if (!Modernizr.inputtypes.date) {
            $('input[type=date]').datepicker({
                changeMonth: true,
                changeYear: true
            });
        }
    }
});



$(function () {
    /*$('#datetabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });*/
    //$('#datetabs a:first').tab('show');

    $(".lnkToday").click(function () {
        var d = new Date();
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth()+1)).slice(-2);
        if (Modernizr.inputtypes.date) {
            $(this).parent("div").prev("div").children("input").val(d.getFullYear() + "-" + mm + "-" + dd);
            //$(this).prev("input").val(d.dateString);
        }
        else {
            $(this).parent("div").prev("div").children("input").val((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());
        }
    });


    $("#btnCalculate").click(function () {
        var dt1 = new Date($("#dtFirst").val());
        var dt2 = new Date($("#dtSecond").val());
        var span = Math.abs(dt2 - dt1);

        var seconds = span / 1000;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var months = days / 30;
        var weeks = days / 7;
        var years = days / 365;

        //var dtSpan = new Date(span);
        $("#pnlResult").html("<p>Seconds : " + seconds + "</p><p>Minutes : " + minutes + "</p><p>Hours : " + hours + "</p><p>Days : " + days + "</p><p>Weeks : " + weeks + "</p><p>Months : " + months + "</p><p>Years : " + years + "</p>").parent().hide().removeClass("hide").slideDown("slow");
        //alert(dtSpan.getHours());
    });
});