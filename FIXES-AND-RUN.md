# CarCare project fixes

## What was corrected

- `/booking` is now the service booking form, not the booking-history screen.
- Booking and booking-history pages check the saved sign-in session and send signed-out visitors to `/login?redirect=...`.
- Login and registration preserve a requested internal destination and return there after successful authentication.
- Redirect destinations are checked to prevent external-site redirects.
- `/my-bookings` is now a real route; the older `/my-account` URL forwards to it.
- Booking history is filtered by the signed-in account's email.
- Service-detail links can preselect the requested service on the booking form.
- The app title and description now use CarCare branding.

## Run locally

From the `carcare` project folder, run:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Quick test checklist

1. Open `/booking` in a signed-out browser. It should send you to sign in.
2. Register a new account or sign in with an existing account.
3. After authentication, you should return to the booking page you originally requested.
4. Submit a booking and confirm it appears at `/my-bookings`.
5. Sign out by clearing the `carcare-user` item from local storage, then try opening `/my-bookings` directly; it should ask you to sign in.

## Demo limitation

This project currently stores accounts, sessions, and bookings in browser `localStorage`. The redirect guard protects the user interface for this demo, but it is not a substitute for server-side authentication and authorization in a production application. Passwords should not be stored in plain text for a production system.
