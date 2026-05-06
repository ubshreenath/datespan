$(function () {

    $(".lnkToday").click(function () {
        var d = new Date();
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        $(this).parent("div").prev("div").children("input").val(d.getFullYear() + "-" + mm + "-" + dd);
    });

    $("#btnCalculate1").click(function () {
        var dt1 = moment($("#dtFirst").val());
        var dt2 = moment($("#dtSecond").val());
        var span = Math.abs(dt2.diff(dt1));
        var seconds = span / 1000;
        var minutes = span / (1000 * 60);
        var hours = span / (1000 * 60 * 60);
        var days = span / (1000 * 60 * 60 * 24);
        var months = span / (1000 * 60 * 60 * 24 * 30);
        var weeks = span / (1000 * 60 * 60 * 24 * 7);
        var years = span / (1000 * 60 * 60 * 24 * 365);

        var friendly = humanSpan(dt1, dt2);
        $("#pnlResult").html("<p><strong>" + friendly + "</strong></p><hr/><p>Seconds : " + seconds + "</p><p>Minutes : " + minutes + "</p><p>Hours : " + hours + "</p><p>Days : " + days + "</p><p>Weeks : " + weeks + "</p><p>Months : " + months + "</p><p>Years : " + years + "</p>")
                        .parent()
                        .hide()
                        .removeClass("hide")
                        .slideDown("slow", function () {
                            $("html, body").animate({scrollTop: $("#pnlResult").offset().top}, 500);
                        });
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
        $("#pnlResult2hdr").html(n + " " + unit + (addsub == 0 ? " before " : " from ") + temp.calendar() + " is: ");
        $("#pnlResult2").html(dt1.calendar() + " ( " + dt1.format("dddd, MMMM Do YYYY") + " )").parent().hide().removeClass("hide").slideDown("slow", function () {
            $("html, body").animate({scrollTop: $("#pnlResult2hdr").offset().top}, 500);
        });
    });
});
