(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./moment.min'));
    } else {
        root.humanSpan = factory(root.moment);
    }
}(this, function (moment) {
    return function humanSpan(dt1, dt2) {
        var start = moment.min(dt1, dt2).clone();
        var end = moment.max(dt1, dt2).clone();
        var years   = end.diff(start, 'years');   start.add(years,   'years');
        var months  = end.diff(start, 'months');  start.add(months,  'months');
        var days    = end.diff(start, 'days');     start.add(days,    'days');
        var hours   = end.diff(start, 'hours');   start.add(hours,   'hours');
        var minutes = end.diff(start, 'minutes'); start.add(minutes, 'minutes');
        var seconds = end.diff(start, 'seconds');
        var parts = [];
        if (years)   parts.push(years   + ' ' + (years   === 1 ? 'year'   : 'years'));
        if (months)  parts.push(months  + ' ' + (months  === 1 ? 'month'  : 'months'));
        if (days)    parts.push(days    + ' ' + (days    === 1 ? 'day'    : 'days'));
        if (hours)   parts.push(hours   + ' ' + (hours   === 1 ? 'hour'   : 'hours'));
        if (minutes) parts.push(minutes + ' ' + (minutes === 1 ? 'minute' : 'minutes'));
        if (seconds) parts.push(seconds + ' ' + (seconds === 1 ? 'second' : 'seconds'));
        if (parts.length === 0) return '0 seconds';
        if (parts.length === 1) return parts[0];
        return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
    };
}));
