var moment = require('./moment.min');
var humanSpan = require('./humanSpan');

var passed = 0;
var failed = 0;

function test(description, dt1Str, dt2Str, expected) {
    var result = humanSpan(moment(dt1Str), moment(dt2Str));
    if (result === expected) {
        console.log('  PASS: ' + description);
        passed++;
    } else {
        console.log('  FAIL: ' + description);
        console.log('        Expected : ' + expected);
        console.log('        Got      : ' + result);
        failed++;
    }
}

console.log('\nhumanSpan tests\n');

// Zero span
test('same date and time',                    '2024-01-01T00:00:00', '2024-01-01T00:00:00', '0 seconds');

// Single units
test('exactly 1 second',                      '2024-01-01T00:00:00', '2024-01-01T00:00:01', '1 second');
test('exactly 5 seconds',                     '2024-01-01T00:00:00', '2024-01-01T00:00:05', '5 seconds');
test('exactly 1 minute',                      '2024-01-01T00:00:00', '2024-01-01T00:01:00', '1 minute');
test('exactly 2 minutes',                     '2024-01-01T00:00:00', '2024-01-01T00:02:00', '2 minutes');
test('exactly 1 hour',                        '2024-01-01T00:00:00', '2024-01-01T01:00:00', '1 hour');
test('exactly 3 hours',                       '2024-01-01T00:00:00', '2024-01-01T03:00:00', '3 hours');
test('exactly 1 day',                         '2024-01-01',          '2024-01-02',          '1 day');
test('exactly 10 days',                       '2024-01-01',          '2024-01-11',          '10 days');
test('exactly 1 month',                       '2024-01-01',          '2024-02-01',          '1 month');
test('exactly 3 months',                      '2024-01-01',          '2024-04-01',          '3 months');
test('exactly 1 year',                        '2023-01-01',          '2024-01-01',          '1 year');
test('exactly 2 years',                       '2022-01-01',          '2024-01-01',          '2 years');

// Mixed spans
test('1 year and 1 month',                    '2023-01-01',          '2024-02-01',          '1 year and 1 month');
test('2 years and 6 months',                  '2022-01-01',          '2024-07-01',          '2 years and 6 months');
test('1 year, 2 months and 3 days',           '2023-01-01',          '2024-03-04',          '1 year, 2 months and 3 days');
test('hours, minutes and seconds',            '2024-01-01T00:00:00', '2024-01-01T02:30:45', '2 hours, 30 minutes and 45 seconds');
test('large mixed span',                      '2020-01-15T08:30:00', '2024-04-20T12:45:30', '4 years, 3 months, 5 days, 4 hours, 15 minutes and 30 seconds');

// Leap year
test('Feb 28 to Mar 1 in leap year = 2 days', '2024-02-28',          '2024-03-01',          '2 days');
test('Feb 29 to Mar 1 = 1 day',               '2024-02-29',          '2024-03-01',          '1 day');
test('full year spanning leap day',           '2024-01-01',          '2025-01-01',          '1 year');
test('Jan 31 to Mar 1 in leap year',          '2024-01-31',          '2024-03-01',          '1 month and 1 day');

// Month-end rollovers
test('Jan 31 to Feb 28 (non-leap) = 28 days', '2023-01-31',          '2023-02-28',          '28 days');
test('Jan 31 to Mar 31 = 2 months',           '2024-01-31',          '2024-03-31',          '2 months');

// Reversed inputs (earlier date in second field)
test('reversed inputs give same result',      '2024-03-01',          '2024-01-01',          '2 months');

console.log('\n' + passed + ' passed, ' + failed + ' failed\n');
if (failed > 0) process.exit(1);
