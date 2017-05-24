# SEEK STORE
Code test implementation

### Getting Started

1.  Run `npm install` in the directory where you cloned this repo

2.  Run `npm start`

A browser window should open running the app at http://localhost:8080/

### Running Tests

Run `npm test` in the directory where you cloned this repo

### Assumptions, Strategies and Constraints

 - I concentrated heavily on the user experience.  In a SEEK context, the brief
 suggests a particular kind of customer, one who purchases far more ads than
 our usual small-medium companies, but not so much as to have a subscription
 or rely entirely on their third-party uploader and barking orders at our sales
 team.  Giving a high-fidelity slice of the sort of experience such a customer
 might have dictated a few choices:  I very much wanted the SEEK appearance
 (thus SEEK style guide), a multi-page flow with an authentic login
 (thus react-router) and the idea of a bulk stock of ads (persistent ad counts
 and a 100 ad dropdown)

 - Products and discount types would change rarely, severely diminishing the
 usefulness of making flexibility the first priority with them.  The specific
 *values* of discounts need to be flexible (ie X for Y not just 5 for 4, 3 for 2)
 but if Sales want to cut a whole new kind of deal they can make a feature request.
 Likewise a new kind of ad probably needs UI and UX considerations, it's unlikely
 any change to the react app would be the hardest/slowest part of that process.

 - The "X for Y" rule is strictly a discount, it doesn't bump up the quantity of
 a relevant ad type from Y to X.  I didn't like the UX of changing the quantity
 the customer entered, as opposed to its result (and this provided a simpler implementation).

 - I wanted to keep as much of my submitted code within the confines of my
 app and indicative of my intentions as possible.  Thus I chose accelerators
 that keep a lot of boilerplate/config/UI primitives in node_modules.  Choosing
 seek-style-guide and sku specifically were to help me give feedback to those
 teams, since I don't get enough chance to exercise them in Company Reviews.
 If I was happy to get less SEEK visual styling for free, I could have just as
 readily used create-react-app and material design or what have you (not
 bootstrap, I have some pride)

 - The API is considered to be in friendly hands (eg maintained by the same team).
 Limited validation of rules is in place to prevent obvious cases of accidentally
 costing the customer extra money, but I didn't spend a lot of time on verifying
 the returns are well formed.

 - I didn't consider it worthwhile to connect to a mock API served from express
 or Mountebank, since the code test never needs to hit a real API.  The actions
 talking to my "API" still behave similarly, and deal with promises in a couple
 of places much as they would with an actual async request.  I just imported the
 "API" function directly where you would normally import a URL and hit it with
 superagent-bluebird-promise or the like.  The emphasis here should be on the
 app's behaviour.

 - Using an early version of sku as my accelerator had the drawback of preventing
 easy modification of webpack config.  I did eventually fork sku so that routing
 would actually work, but the app was built with a structure that benefits from
 `modulesDirectories` without that config being present.  This is why you see
 too many `../../../`s in import statements.  I still think this structure is
 worthwhile in keeping related concerns close together (and has proven itself
 in componetised situations, it's no accident it resembles the "angular best
 practice" structure)

 - I used some things purely to learn them (redux-form).  I think that's
 obviously useful for sign in but since there's no need for validation on
 the actual ad selection form I could have arguably done without it *shrug*

 - I assumed performance was unimportant.  The `calculateAdTypeSubtotal` function
 is called multiple times when the number of ads to be purchased is changed.
 This would be unnecessary if I'd wired up a reducer to hold the derived state
 of the cart, but the implementation I used was simpler and I was spending
 enough time on the app already without resorting to premature optimisation :)

 - But I assumed responsiveness for the user was critical in the context of the
 scenario.  Thus I had the "client" perform price calculations even though I
 intended to throw them away and take the "API"'s instead at purchase time.
 That is not where I would want the user to suffer latency.  The app would
 benefit from animations and transitions to improve the appearance of responsiveness
 but time did not allow.

 - End to End testing would be out of scope for a code test but probably necessary
 in real life.  E2E is expensive and often frustratingly flaky, but we still
 suffer errors in prod that E2E tests doing actual clicks would have caught.
 Conversely I don't think screenshot testing would be necessary for this app,
 between the style guide and css modules it's unlikely you'll cause a visual
 regression and not notice it during development, given at least minimal
 snapshot testing verifying you haven't deleted anything important.
