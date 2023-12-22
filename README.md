# ics

[![npm version](https://badge.fury.io/js/@kusyka911%2Fics.svg)](https://badge.fury.io/js/@kusyka911%2Fics)
[![Build](https://github.com/kusyka911/ics-builder/actions/workflows/publish.yml/badge.svg)](https://github.com/kusyka911/ics-builder/actions/workflows/publish.yml)

## Fork
> Project forked to make package available for usage via CDN from [JSDelivr](https://jsdelivr.com/).
>
> All dependencies are bundled.
>
> In case of using with bundler - please use original [ics](https://www.npmjs.com/package/ics) package.

#### CDN usage
1) Using CDN
```html
    <script src="https://cdn.jsdelivr.net/npm/@kusyka911/ics/dist/bundled/index.umd.js"></script>
    <script>
        const ics = window.ICS;
        async function handleDownload() {
            // ...
        }
    </script>
```

2) CDN + ES import
```html
    <script type="module">
      import * as ics from 'https://cdn.jsdelivr.net/npm/@kusyka911/ics/dist/bundled/index.es.js';
      async function handleDownload() {
          // ...
      }
    </script>
```

> You can specify version in CDN URL. 
>
> Template: https://cdn.jsdelivr.net/npm/@kusyka911/ics@{VERSION_TAG}/dist/bundled/index.es.js
>
> Example: https://cdn.jsdelivr.net/npm/@kusyka911/ics@3.7.2/dist/bundled/index.es.js
>
>See [jsdelivr](https://www.jsdelivr.com/package/npm/@kusyka911/ics) for more info.

> Original package docs bellow.

The [iCalendar](http://tools.ietf.org/html/rfc5545) generator

## Install

`npm install -S ics`

## Example Usage

#### In node / CommonJS

1) Create an iCalendar event:

```javascript
const ics = require('ics')
// or, in ESM: import * as ics from 'ics'

const event = {
  start: [2018, 5, 30, 6, 30],
  duration: { hours: 6, minutes: 30 },
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  geo: { lat: 40.0095, lon: 105.2669 },
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
  status: 'CONFIRMED',
  busyStatus: 'BUSY',
  organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
  attendees: [
    { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
    { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
  ]
}

ics.createEvent(event, (error, value) => {
  if (error) {
    console.log(error)
    return
  }

  console.log(value)
})
// BEGIN:VCALENDAR
// VERSION:2.0
// CALSCALE:GREGORIAN
// PRODID:adamgibbons/ics
// METHOD:PUBLISH
// X-PUBLISHED-TTL:PT1H
// BEGIN:VEVENT
// UID:S8h0Vj7mTB74p9vt5pQzJ
// SUMMARY:Bolder Boulder
// DTSTAMP:20181017T204900Z
// DTSTART:20180530T043000Z
// DESCRIPTION:Annual 10-kilometer run in Boulder\, Colorado
// X-MICROSOFT-CDO-BUSYSTATUS:BUSY
// URL:http://www.bolderboulder.com/
// GEO:40.0095;105.2669
// LOCATION:Folsom Field, University of Colorado (finish line)
// STATUS:CONFIRMED
// CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
// ORGANIZER;CN=Admin:mailto:Race@BolderBOULDER.com
// ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Adam Gibbons:mailto:adam@example.com
// ATTENDEE;RSVP=FALSE;ROLE=OPT-PARTICIPANT;DIR=https://linkedin.com/in/brittanyseaton;CN=Brittany
//   Seaton:mailto:brittany@example2.org
// DURATION:PT6H30M
// END:VEVENT
// END:VCALENDAR
```

2) Write an iCalendar file:
```javascript
const { writeFileSync } = require('fs')
const ics = require('ics')

ics.createEvent({
  title: 'Dinner',
  description: 'Nightly thing I do',
  busyStatus: 'FREE',
  start: [2018, 1, 15, 6, 30],
  duration: { minutes: 50 }
}, (error, value) => {
  if (error) {
    console.log(error)
  }

  writeFileSync(`${__dirname}/event.ics`, value)
})
```

3) Create multiple iCalendar events:
```javascript
const ics = require('./dist')

const { error, value } = ics.createEvents([
  {
    title: 'Lunch',
    start: [2018, 1, 15, 12, 15],
    duration: { minutes: 45 }
  },
  {
    title: 'Dinner',
    start: [2018, 1, 15, 12, 15],
    duration: { hours: 1, minutes: 30 }
  }
])

if (error) {
  console.log(error)
  return
}

console.log(value)
// BEGIN:VCALENDAR
// VERSION:2.0
// CALSCALE:GREGORIAN
// PRODID:adamgibbons/ics
// METHOD:PUBLISH
// X-PUBLISHED-TTL:PT1H
// BEGIN:VEVENT
// UID:pP83XzQPo5RlvjDCMIINs
// SUMMARY:Lunch
// DTSTAMP:20230917T142209Z
// DTSTART:20180115T121500Z
// DURATION:PT45M
// END:VEVENT
// BEGIN:VEVENT
// UID:gy5vfUVv6wjyBeNkkFmBX
// SUMMARY:Dinner
// DTSTAMP:20230917T142209Z
// DTSTART:20180115T121500Z
// DURATION:PT1H30M
// END:VEVENT
// END:VCALENDAR
```

4) Create iCalendar events with Audio (Mac):
```javascript
let ics = require("ics")
let moment = require("moment")
let events = []
let alarms = []

let start = moment().format('YYYY-M-D-H-m').split("-").map((a) => parseInt(a))
let end = moment().add({'hours':2, "minutes":30}).format("YYYY-M-D-H-m").split("-").map((a) => parseInt(a))

alarms.push({
  action: 'audio',
  description: 'Reminder',
  trigger: {hours:2,minutes:30,before:true},
  repeat: 2,
  attachType:'VALUE=URI',
  attach: 'Glass'
})

let event = {
  productId:"myCalendarId",
  uid: "123"+"@ics.com",
  startOutputType:"local",
  start: start,
  end: end,
  title: "test here",
  alarms: alarms
}
events.push(event)
console.log(ics.createEvents(events).value)

// BEGIN:VCALENDAR
// VERSION:2.0
// CALSCALE:GREGORIAN
// PRODID:myCalendarId
// METHOD:PUBLISH
// X-PUBLISHED-TTL:PT1H
// BEGIN:VEVENT
// UID:123@ics.com
// SUMMARY:test here
// DTSTAMP:20230917T142621Z
// DTSTART:20230917T152600
// DTEND:20230917T175600
// BEGIN:VALARM
// ACTION:AUDIO
// REPEAT:2
// DESCRIPTION:Reminder
// ATTACH;VALUE=URI:Glass
// TRIGGER:-PT2H30M\nEND:VALARM
// END:VEVENT
// END:VCALENDAR
```

#### Using ESModules & in the browser

```javascript
import { createEvent} from 'ics';

const event = {
  ...
}

async function handleDownload() {
  const filename = 'ExampleEvent.ics'
  const file = await new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error)
      }

      resolve(new File([value], filename, { type: 'text/calendar' }))
    })
  })
  const url = URL.createObjectURL(file);

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}
```

## API

### `createEvent(attributes[, callback])`

Generates an iCal-compliant VCALENDAR string with one VEVENT.
If a callback is not provided, returns an object having the form `{ error, value }`,
where `value` contains an iCal-compliant string if there are no errors.
If a callback is provided, returns a Node-style callback.

#### `attributes`

Object literal containing event information.
Only the `start` property is required.

Note all date/time fields can be the array form, or a number representing the unix timestamp in milliseconds (e.g. `getTime()` on a `Date`).

The following properties are accepted:

| Property      | Description   | Example  |
| ------------- | ------------- | ----------
| start         | **Required**. Date and time at which the event begins. | `[2000, 1, 5, 10, 0]` (January 5, 2000) or a `number`
| startInputType | Type of the date/time data in `start`:<br>`local` (default): passed data is in local time.<br>`utc`: passed data is UTC |
| startOutputType | Format of the start date/time in the output:<br>`utc` (default): the start date will be sent in UTC format.<br>`local`: the start date will be sent as "floating" (form #1 in [RFC 5545](https://tools.ietf.org/html/rfc5545#section-3.3.5)) |
| end           | Time at which event ends. *Either* `end` or `duration` is required, but *not* both. | `[2000, 1, 5, 13, 5]` (January 5, 2000 at 1pm) or a `number`
| endInputType | Type of the date/time data in `end`:<br>`local`: passed data is in local time.<br>`utc`: passed data is UTC.<br>The default is the value of `startInputType` |
| endOutputType | Format of the start date/time in the output:<br>`utc`: the start date will be sent in UTC format.<br>`local`: the start date will be sent as "floating" (form #1 in [RFC 5545](https://tools.ietf.org/html/rfc5545#section-3.3.5)).<br>The default is the value of `startOutputType` |
| duration      | How long the event lasts. Object literal having form `{ weeks, days, hours, minutes, seconds }` *Either* `end` or `duration` is required, but *not* both. | `{ hours: 1, minutes: 45 }` (1 hour and 45 minutes)
| title         | Title of event. | `'Code review'`
| description   | Description of event. | `'A constructive roasting of those seeking to merge into master branch'`
| location      | Intended venue | `Mountain Sun Pub and Brewery`
| geo   | Geographic coordinates (lat/lon) | `{ lat: 38.9072, lon: 77.0369 }`
| url           | URL associated with event | `'http://www.mountainsunpub.com/'`
| status        | Three statuses are allowed: `TENTATIVE`, `CONFIRMED`, `CANCELLED` | `CONFIRMED`
| organizer     | Person organizing the event | `{ name: 'Adam Gibbons', email: 'adam@example.com', dir: 'https://linkedin.com/in/adamgibbons', sentBy: 'test@example.com' }`
| attendees     | Persons invited to the event | `[{ name: 'Mo', email: 'mo@foo.com', rsvp: true }, { name: 'Bo', email: 'bo@bar.biz', dir: 'https://twitter.com/bo1234', partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }]`
| categories    | Categories associated with the event | `['hacknight', 'stout month']`
| alarms        | Alerts that can be set to trigger before, during, or after the event. The following `attach` properties work on Mac OS: Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sousumi, Submarine, Tink | `{ action: 'display', description: 'Reminder', trigger: [2000, 1, 4, 18, 30] }` OR `{ action: 'display', description: 'Reminder', trigger: { hours: 2, minutes: 30, before: true } }` OR `{ action: 'display', description: 'Reminder', trigger: { hours: 2, minutes: 30, before: false }` OR `{ action: 'audio', description: 'Reminder', trigger: { hours: 2, minutes: 30, before: true }, repeat: 2, attachType: 'VALUE=URI', attach: 'Glass' }`
| productId     | Product which created ics, `PRODID` field | `'adamgibbons/ics'`
| uid           | Universal unique id for event, produced by default with `nanoid`.  **Warning:** This value must be **globally unique**.  It is recommended that it follow the [RFC 822 addr-spec](https://www.w3.org/Protocols/rfc822/) (i.e. `localpart@domain`).  Including the `@domain` half is a good way to ensure uniqueness. | `'LZfXLFzPPR4NNrgjlWDxn'`
| method        | This property defines the iCalendar object method associated with the calendar object. When used in a MIME message entity, the value of this property MUST be the same as the Content-Type "method" parameter value.  If either the "METHOD" property or the Content-Type "method" parameter is specified, then the other MUST also be specified. | `PUBLISH`
| recurrenceRule        | A recurrence rule, commonly referred to as an RRULE, defines the repeat pattern or rule for to-dos, journal entries and events. If specified, RRULE can be used to compute the recurrence set (the complete set of recurrence instances in a calendar component). You can use a generator like this [one](https://www.textmagic.com/free-tools/rrule-generator). | `FREQ=DAILY`
| exclusionDates | Array of date-time exceptions for recurring events, to-dos, journal entries, or time zone definitions. | `[[2000, 1, 5, 10, 0], [2000, 2, 5, 10, 0]]` OR `[1694941727477, 1694945327477]`
| sequence      | For sending an update for an event (with the same uid), defines the revision sequence number. | `2`
| busyStatus    | Used to specify busy status for Microsoft applications, like Outlook. See [Microsoft spec](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxcical/cd68eae7-ed65-4dd3-8ea7-ad585c76c736). | `'BUSY'` OR `'FREE'` OR `'TENTATIVE`' OR `'OOF'`
| transp        | Used to specify event transparency (does event consume actual time of an individual). Used by Google Calendar to determine if event should change attendees availability to 'Busy' or not. | `'TRANSPARENT'` OR `'OPAQUE'`
| classification    | This property defines the access classification for a calendar component. See [iCalender spec](https://icalendar.org/iCalendar-RFC-5545/3-8-1-3-classification.html). | `'PUBLIC'` OR `'PRIVATE'` OR `'CONFIDENTIAL`' OR any non-standard string
| created | Date-time representing event's creation date. Provide a date-time in local time | `[2000, 1, 5, 10, 0]` or a `number`
| lastModified | Date-time representing date when event was last modified. Provide a date-time in local time | [2000, 1, 5, 10, 0] or a `number`
| calName       |  Specifies the _calendar_ (not event) name. Used by Apple iCal and Microsoft Outlook; see [Open Specification](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxcical/1da58449-b97e-46bd-b018-a1ce576f3e6d) | `'Example Calendar'` |
| htmlContent       | Used to include HTML markup in an event's description. Standard DESCRIPTION tag should contain non-HTML version. | `<!DOCTYPE html><html><body><p>This is<br>test<br>html code.</p></body></html>` |

To create an **all-day** event, pass only three values (`year`, `month`, and `date`) to the `start` and `end` properties.
The date of the `end` property should be the day *after* your all-day event.
For example, in order to create an all-day event occuring on October 15, 2018:
```javascript
const eventAttributes = {
  start: [2018, 10, 15],
  end: [2018, 10, 16],
  /* rest of attributes */
}
```

#### `callback`

Optional.
Node-style callback.

```javascript
function (err, value) {
  if (err) {
    // if iCal generation fails, err is an object containing the reason
    // if iCal generation succeeds, err is null
  }

  console.log(value) // iCal-compliant text string
}
```

### `createEvents(events[, headerParams, callback])`

Generates an iCal-compliant VCALENDAR string with multiple VEVENTS.

`headerParams` may be omitted, and in this case they will be read from the first event.

If a callback is not provided, returns an object having the form `{ error, value }`, where value is an iCal-compliant text string
if `error` is `null`.

If a callback is provided, returns a Node-style callback.

#### `events`

Array of `attributes` objects (as described in `createEvent`).

#### `callback`

Optional.
Node-style callback.

```javascript
function (err, value) {
  if (err) {
    // if iCal generation fails, err is an object containing the reason
    // if iCal generation succeeds, err is null
  }

  console.log(value) // iCal-compliant text string
}
```

## Develop

Run mocha tests and watch for changes:
```
npm start
```

Run tests once and exit:
```
npm test
```

Build the project, compiling all ES6 files within the `src` directory into vanilla JavaScript in the `dist` directory.
```
npm run build
```

## References

- [RFC 5545: Internet Calendaring and Scheduling Core Object Specification (iCalendar)](http://tools.ietf.org/html/rfc5545)
- [iCalendar Validator](http://icalendar.org/validator.html#results)