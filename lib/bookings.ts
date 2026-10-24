
import { getCurrentUser } from "./auth";

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  vehicle: string;
  plate: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
};

const STORAGE_KEY = "carcare-bookings";

function readAllBookings(): Booking[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is Booking =>
        item !== null &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.email === "string",
    );
  } catch {
    return [];
  }
}

function getLoggedInEmail(): string {
  const user = getCurrentUser();
  return user?.email?.trim().toLowerCase() ?? "";
}

export function getBookings(): Booking[] {
  const email = getLoggedInEmail();

  if (!email) return [];

  return readAllBookings().filter(
    (booking) => booking.email.trim().toLowerCase() === email,
  );
}

export function saveBooking(
  booking: Omit<Booking, "id" | "createdAt">,
): Booking {
  const email = getLoggedInEmail();

  if (!email) {
    throw new Error("Please log in before creating a booking.");
  }

  if (booking.email.trim().toLowerCase() !== email) {
    throw new Error("You can only create bookings for your own account.");
  }

  const allBookings = readAllBookings();

  const newBooking: Booking = {
    ...booking,
    email,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...allBookings, newBooking]),
  );

  return newBooking;
}

export function deleteBooking(id: string): void {
  const email = getLoggedInEmail();

  if (!email) {
    throw new Error("Please log in to delete a booking.");
  }

  const allBookings = readAllBookings();

  const updatedBookings = allBookings.filter(
    (booking) =>
      !(booking.id === id &&
        booking.email.trim().toLowerCase() === email),
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
}
