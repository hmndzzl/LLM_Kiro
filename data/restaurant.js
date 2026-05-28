// data/restaurant.js
export const restaurantInfo = {
  name: "Taquería El Sabor",
  tagline: "Carnitas & Al Pastor — Cooked the Traditional Way",
  address: "123 Main Street, City, State 00000",
  phone: "+1-555-000-0000",
  hours: [
    { day: "Monday",    open: "11:00 AM", close: "9:00 PM" },
    { day: "Tuesday",   open: "11:00 AM", close: "9:00 PM" },
    { day: "Wednesday", open: "11:00 AM", close: "9:00 PM" },
    { day: "Thursday",  open: "11:00 AM", close: "9:00 PM" },
    { day: "Friday",    open: "11:00 AM", close: "10:00 PM" },
    { day: "Saturday",  open: "10:00 AM", close: "10:00 PM" },
    { day: "Sunday",    open: "10:00 AM", close: "8:00 PM" }
  ],
  socialMedia: [
    { platform: "Instagram", url: "https://instagram.com/example", label: "Follow us on Instagram" },
    { platform: "Facebook",  url: "https://facebook.com/example",  label: "Like us on Facebook" }
  ],
  mapsEmbedUrl: "" // Set to a Google Maps embed URL when available
};
