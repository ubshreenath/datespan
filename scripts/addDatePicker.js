/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="moment.min.js"/>
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

    $(".lnkToday").click(function () {
        var d = new Date();
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        if (Modernizr.inputtypes.date) {
            $(this).parent("div").prev("div").children("input").val(d.getFullYear() + "-" + mm + "-" + dd);
            //$(this).prev("input").val(d.dateString);
        }
        else {
            $(this).parent("div").prev("div").children("input").val((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());
        }
    });


    $("#btnCalculate1").click(function () {
        var dt1 = moment($("#dtFirst").val());
        var dt2 = moment($("#dtSecond").val());
        var span = Math.abs(dt2.diff(dt1));
        //console.log(span);
        var seconds = span / 1000;
        var minutes = span / (1000 * 60);
        var hours = span / (1000 * 60 * 60);
        var days = span / (1000 * 60 * 60 * 24);
        var months = span / (1000 * 60 * 60 * 24 * 30);
        var weeks = span / (1000 * 60 * 60 * 24 * 7);
        var years = span / (1000 * 60 * 60 * 24 * 365);

        //var dtSpan = new Date(span);
        $("#pnlResult").html("<p>Seconds : " + seconds + "</p><p>Minutes : " + minutes + "</p><p>Hours : " + hours + "</p><p>Days : " + days + "</p><p>Weeks : " + weeks + "</p><p>Months : " + months + "</p><p>Years : " + years + "</p>")
						.parent()
						.hide()
						.removeClass("hide")
						.slideDown("slow");
		$("body").animate({scrollTop: $("#pnlResult").offset().top}, 800);
						
        //alert(dtSpan.getHours());
    });
    $("#btnCalculate2").click(function () {
        var dt1 = moment($("#dtMain").val());
        var temp = moment($("#dtMain").val());
        
        var addsub = ($(":radio[name='addsub']:checked").val() == "sub") ? 0 : 1;
        var n = $("#n").val();
        var unit = $("#f").val();
        switch (addsub) {
            case 1:
                dt1.add(n, unit);
                break;
            case 0:
                dt1.subtract(n, unit);
                break;
        }
        //console.log(dt2.calendar());
        $("#pnlResult2hdr").html(n + " " + unit + (addsub==0?" before ":" from ") + temp.calendar() + " is: ");
        $("#pnlResult2").html(dt1.calendar() + " ( " + dt1.format("dddd, MMMM Do YYYY") + " )").parent().hide().removeClass("hide").slideDown("slow").scrollTop();
		$("body").animate({scrollTop: $("#pnlResult2hdr").offset().top}, 800);
    });
});