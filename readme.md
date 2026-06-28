# InstantSubmissions

A full-stack, real-time form submission dashboard. Create a form, get back a unique endpoint, point any HTML `<form>` at it, and watch submissions land live in a table — no matter what fields the form collects.

The core idea: the frontend doesn't assume a schema. Any field name you send shows up as a column automatically, live, the moment it arrives.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=for-the-badge&logo=websocket&logoColor=white)

## Why this exists

Most form-handling tools assume you know your schema ahead of time. InstantSubmissions doesn't — it watches raw HTTP submissions, keyed only by each `<input>`'s `name` attribute, and builds the table's structure from whatever actually arrives. Submit a contact form with `name`/`email`/`message` and a job application with `full_name`/`role`/`years_experience` to two different forms, and each gets its own live, correctly-shaped table — with zero configuration.

## How it works

1. **Create a form** on the dashboard — give it a name and optional description.
2. The backend generates a unique form ID and returns a submission endpoint.
3. **Point any HTML form's `action`** at that endpoint:
   ```html
   <form action="http://your-api.com/api/submit/<formId>" method="POST">
     <input type="text" name="email" placeholder="Enter your email" required />
     <button type="submit">Submit</button>
   </form>
   ```
4. Every submission is saved to MongoDB and pushed instantly to anyone watching that form's dashboard page, via a dedicated Socket.io event scoped to that form.
5. The frontend derives table columns from the union of keys across all submissions received — new fields simply appear as new columns, live.

## Architecture

```
Browser (HTML form)              InstantSubmissions Backend           Dashboard (React)
       |                                  |                                  |
       |---- POST /api/submit/:formId --->|                                  |
       |                                  |--- saves to MongoDB              |
       |                                  |--- io.emit("new-submission-id")->|
       |                                  |                          (live table update)
```

Each form gets its own Socket.io event name (`new-submission-<formId>`), so a dashboard watching one form only receives events relevant to that form — no filtering needed on the client.

## Tech stack

**Backend**
- Node.js / Express
- MongoDB with Mongoose
- Socket.io for real-time push

**Frontend**
- React + Vite
- Tailwind CSS v4.3 (CSS-first `@theme` config)
- TanStack React Query (server state, caching, mutations)
- react-router-dom
- socket.io-client

## Project structure

```
backend/
  controllers/
    controller.forms.js        # createForm, getForms
    controller.submissions.js  # createSubmission, getSubmissions
  models/
    model.form.js
    model.submission.js
  routes/
    forms.routes.js
    submission.routes.js
  config/
    db.js
  server.js

frontend/
  src/
    pages/
      Dashboard.jsx             # list forms, create new form
      FormDetail.jsx            # live submissions table for one form
    components/
      Header/
        Header.jsx
      Dashboard/
        FormCard.jsx             # one form's card: name, count, copy ID/snippet
        CreateForm.jsx           # modal for creating a new form
        FormsList.jsx
      FormDetail/
        SubmissionsTable.jsx     # dynamic-column live table
    hooks/
      useForms.js                # React Query: list + create forms
      useSubmissions.js          # React Query + socket: live submissions for one form
    pages/
      Dashboard.jsx
      FormDetail.jsx
    lib/
      api.js                     # REST calls
      socket.js                  # shared socket.io-client instance
    theme.css                    # Tailwind v4.3 @theme tokens
```

## API reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/createForm` | Create a new form. Body: `{ name, description? }` |
| `GET` | `/api/forms` | List all forms, with submission counts |
| `POST` | `/api/submit/:formId` | Submit data to a form (this is what your HTML form's `action` points at) |
| `GET` | `/api/submissions/:formId` | Get all submissions for one form |

**Socket event:** `new-submission-<formId>` — emitted server-side on every successful submission to that form; the frontend subscribes per-form when viewing its detail page.

## Running locally

**Backend**
```bash
cd backend
npm install
# create a .env with MONGO_URI and PORT
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
# create a .env with VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Design decisions worth knowing about

- **No authentication yet.** Anyone with the dashboard URL can see all forms. Fine for a single-user/portfolio context; a real multi-tenant deployment would need an `ownerId` on `Form` and auth middleware on the forms routes.
- **No fixed schema per form.** Forms don't declare expected fields ahead of time — the table adapts to whatever's submitted. This is a deliberate tradeoff: less upfront configuration, at the cost of no validation on submitted data shape.
- **One socket event per form**, rather than one global event filtered client-side. Keeps the frontend simple (subscribe only to what you're looking at) at the cost of the server holding open more distinct event names as forms grow — acceptable at small-to-moderate scale.

## Possible future additions

- Authentication and per-user form ownership
- Optional schema definition per form, with validation on submission
- Export submissions as CSV
- Rate limiting on the public submission endpoint