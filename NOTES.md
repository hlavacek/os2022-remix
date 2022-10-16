# Remix workshop

## 1. Introduction
- what we are going to build

---

## 2. Setup

---
## 3. Remix overview

---
## 4. Adding events route
Branch 01

### Todo
* [ ] add a route "events"
* [ ] add exported component `EventsIndexPage`
* [ ] update `index.tsx` (cleanup and link to `/events` instead of `/notes`)
* [ ] update `login.tsx` to navigate to `/events` instead of `/notes`

### Notes
* root layout route `root.tsx`
* basic routes in `route` directory (rendered in `Outlet` of root.tsx)
* dynamic route params (directory with route name)
    * index.tsx
    * named routes
    * dynamic segments starting with `$`

---
## 5. Adding events/index route
Branch 02

### Todo
* [ ] add a route `events/index.tsx`, with component `EventIndexPage`
* [ ] update `events/index.tsx` add `loader` function that returns static data
* [ ] display data in the component using `useLoaderData`
* [ ] update `events.tsx` to render `Outlet`

### Notes
* async `loader` function that returns Response object
* we typically use `json` util to make it simpler to return data (so we don't need to define required headers every time)
* `LoaderArgs` allows us to access multiple useful things
    * `request` object - for example to read cookies
    * `params` object - to read dynamic route params
    * `context` object - used for server adapters (not in scope of this workshop)
* `useLoaderData` hook to access data returned from `loader` function

---

## 6. DB setup
Branch 03

### Todo
* [ ] update `prisma/schema.prisma` with model for `Event` and `Registration`
* [ ] run `npm run setup` to update DB
* [ ] update `prisma/seed.ts` to seed DB with some data for events
* [ ] run `npm run setup` again to update DB with new seed

### Notes
* what is Prisma
* where our data is stored (SQLite)
* how to check data in SQLite db

---

## 7. Loading data from DB
Branch 04

### Todo
* [ ] add async `models/events.server.ts` with function `getEventsWithRegistrationCount`
* [ ] update `events/index.tsx` to use `getEventsWithRegistrationCount` to load data
* [ ] update component to registrations correctly

### Notes
* naming convention for server side code (`.server.ts`) this code will not get to client

--- 

## 8. Adding event details page
Branch 05

### Todo
* [ ] add route `events/$eventId.tsx` with component `EventDetailsPage`
* [ ] update `events/index.tsx` to link to event details page
* [ ] add async function `getEventById` to `models/events.server.ts`
* [ ] update `events/$eventId.tsx` to use `getEventById` to load data

### Notes
* `Link` component to link to other routes
* we can use `invariant` to assumption checks and make Typescript happy
* `loader` function can also "throw" Response - this can later be used in `CatchBoudary` (more on boundaries later)

---

## 9. Adding registration form
Branch 06

### Todo
* [ ] add `Form` with method `POST` to `events/$eventId.tsx`
* [ ] add `input` of type `text` for `name`
* [ ] add `button` of type `submit` with text `Register`
* [ ] add async `action` handler
* [ ] add Tailwind forms
    * `npm install @tailwindcss/forms`
    * add `@tailwindcss/forms` to `tailwind.config.js` (`plugins: [require("@tailwindcss/forms")]`)

### Notes
* `Form` component vs `form` element

---

## 10. Adding registration to DB
Branch 07

### Todo
* [ ] add `models/registrations.server.ts` with async `createRegistration` function
* [ ] updated `action` handler in `events/$eventId.tsx` to use `createRegistration`
* [ ] use `request.formData` to read value from the form
* [ ] `redirect` back to `events` page

### Notes
* `action` handles non-GET requests
* `action` handlers have same api as `loader` functions
* when `GET` is called multiple loaders in page hierarchy are called to for the UI, when `POST` is called only the action of the current page is called
* `request.formData` to read form data
* `action` typically returns `redirect` response, but can also throw response

---

## 11. Adding form validation
Branch 08

### Todo
* [ ] extend `action` handler to validate eventId and name. If one of them is missing return `json` with errors
* [ ] use `useActionData` hook to display error in the form

### Notes
* `action` handler can return `json` with errors
* we can use any validation library we want - for example `yup` and `zod` are popular

---

## 12. Displaying list of registrations
Branch 09

### Todo
* [ ] extend `models/registration.server.ts` with `getEventRegistrations` function
* [ ] update `events/$eventId.tsx` to use `getEventRegistrations` to load data and return it together with `event` data
* [ ] display list or registrations(registered users) in the `events/$eventId.tsx` page
* [ ] extract list of registrations to separate component (`components/RegistraitonList.tsx`)

### Notes
* `loader` function can retrieve data from multiple sources and return it together
* we can use standard React components for rendering data and to make it reusable

---

## 13. Adding boundaries
Branch 10

### Todo
* [ ] navigate to page with non-existing event id - you will see 404 error, but no UI
* [ ] add `CatchBoundary` to `events/$eventId.tsx` to display error UI
* [ ] use `useCatch` to get caught error and display it in the UI
* [ ] throw new `Error`, if status is unknown
* [ ] add `ErrorBoundary` to `events/index.tsx` to handle thrown Errors in the UI

### Notes
* there are two types of boundaries
    * `CatchBoundary` - catches thrown response from `loader` functions and `action` handlers
    * `ErrorBoundary` - catches throws exceptions from `loader` functions and `action` handlers
* they can be placed on multiple levels of page hierarchy to have remaining part of app working