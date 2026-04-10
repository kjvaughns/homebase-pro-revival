

## Add Google Places Autocomplete to Address Field

### Overview
Add address autocomplete to the booking details step so typing an address shows Google Places suggestions.

### Prerequisites
You'll need a **Google Maps API key** with the **Places API** enabled. I'll need to store it as a secret in your project so it can be used securely.

### Changes

**1. Create `src/components/AddressAutocomplete.tsx`**
- A reusable component that loads the Google Places Autocomplete (via the Maps JavaScript API `places` library)
- Uses a plain `<Input>` with a `useEffect` that attaches `google.maps.places.Autocomplete` to the input ref
- On place selection, extracts the formatted address and calls `onChange`
- Loads the Google Maps script dynamically if not already present (using the API key from `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`)

**2. Update `src/pages/AIBookingPage.tsx`**
- Replace the plain `<Input>` for address (around line 793) with the new `<AddressAutocomplete>` component
- Same styling, same `value`/`onChange` pattern

**3. Store the API key**
- Since the Google Maps API key is a **publishable client-side key** (it's loaded in the browser anyway), it will be stored as `VITE_GOOGLE_MAPS_API_KEY` in the codebase `.env` file
- You'll need to provide a Google Maps API key with Places API enabled

### Technical Notes
- No npm packages needed — uses the Google Maps JavaScript API directly
- The script is loaded once via a dynamic `<script>` tag injection
- Autocomplete is restricted to addresses to improve relevance

