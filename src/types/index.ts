import type { ReactElement, ReactNode } from "react";

// ==========================================
// Database / Supabase Entity Types
// ==========================================

/** Guest entity from the "guests" table */
export interface Guest {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
  country?: string;
}

/** Cabin entity from the "cabins" table */
export interface Cabin {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string | FileList | File;
  description: string;
}

/** New cabin data for creating or editing (image can be a File or string URL) */
export interface CabinFormData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string | FileList | File;
  description: string;
}

/** Booking entity from the "bookings" table (full detail with relations) */
export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: { name: string };
  guests: Guest;
}

/** Booking row in the booking table (partial select with nested relations) */
export interface BookingRow {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: BookingStatus;
  cabins: { name: string };
  guests: { fullName: string; email: string };
}

/** Booking status enum */
export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

/** Booking data returned from getBookingsAfterDate (for dashboard/sales charts) */
export interface RecentBooking {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

/** Stay data returned from getStaysAfterDate (for dashboard/duration charts) */
export interface Stay {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  guests: { fullName: string };
}

/** Today's activity item (check-in or check-out for today) */
export interface TodayActivity {
  id: number;
  status: BookingStatus;
  numNights: number;
  guests: {
    fullName: string;
    nationality: string;
    countryFlag: string;
    country: string;
  };
}

/** Settings entity from the "settings" table */
export interface Settings {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

/** Partial settings for updating */
export type UpdateSettingData = Partial<Omit<Settings, "id" | "created_at">>;

// ==========================================
// Booking Seed Data (used by Uploader)
// ==========================================

/** Booking seed data shape used in data-bookings.ts */
export interface BookingSeedData {
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId: number;
  guestId: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
}

/** Guest seed data shape used in data-guests.ts */
export interface GuestSeedData {
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
}

/** Cabin seed data shape used in data-cabins.ts */
export interface CabinSeedData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

// ==========================================
// API / Query Parameter Types
// ==========================================

/** Filter parameter for getBookings */
export interface BookingFilter {
  field: string;
  value: string;
  method?: "eq" | "gte" | "lte" | "neq";
}

/** Sort parameter for getBookings */
export interface BookingSortBy {
  field: string;
  direction: string;
}

/** Parameters for getBookings API call */
export interface GetBookingsParams {
  filter: BookingFilter | null;
  sortBy: BookingSortBy;
  page: number;
}

/** Return type for getBookings API call */
export interface GetBookingsResult {
  data: BookingRow[];
  count: number | null;
}

/** Partial booking data for updating a booking */
export type UpdateBookingData = Partial<
  Omit<Booking, "id" | "created_at" | "cabins" | "guests">
>;

// ==========================================
// Auth Types
// ==========================================

/** Signup credentials */
export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

/** Login credentials */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Update current user data */
export interface UpdateUserData {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}

// ==========================================
// Check-in Types
// ==========================================

/** Breakfast options for check-in */
export interface BreakfastData {
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
}

/** Check-in mutation parameters */
export interface CheckinData {
  bookingId: number;
  breakfast: BreakfastData;
}

// ==========================================
// Component Prop Types
// ==========================================

/** Props for BookingDataBox */
export interface BookingDataBoxProps {
  booking: Booking;
}

/** Props for BookingRow component */
export interface BookingRowProps {
  booking: BookingRow;
}

/** Props for CabinRow component */
export interface CabinRowProps {
  cabin: Cabin;
}

/** Props for CreateCabinForm */
export interface CreateCabinFormProps {
  cabinToEdit?: Cabin | Record<string, never>;
  onCloseModal?: () => void;
}

/** Props for TodayItem */
export interface TodayItemProps {
  activity: TodayActivity;
}

/** Props for Stats component */
export interface StatsProps {
  bookings: RecentBooking[];
  confirmedStays: Stay[];
  numDays: number;
  cabinCount: number;
}

/** Props for Stat component */
export interface StatProps {
  icon: ReactElement;
  title: string;
  value: string | number;
  color: "blue" | "green" | "indigo" | "yellow";
}

/** Props for SalesChart */
export interface SalesChartProps {
  bookings: RecentBooking[];
  numDays: number;
}

/** Props for DurationChart */
export interface DurationChartProps {
  confirmedStays: Stay[];
}

/** Duration chart data point */
export interface DurationChartData {
  duration: string;
  value: number;
  color: string;
}

/** Props for ConfirmDelete */
export interface ConfirmDeleteProps {
  resourceName: string;
  disabled?: boolean;
  onConfirm: () => void;
  onCloseModal?: () => void;
}

/** Props for Tag component */
export interface TagProps {
  type: "blue" | "green" | "silver";
}

/** Props for Menus.Button */
export interface MenusButtonProps {
  icon?: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

/** Props for CheckoutButton */
export interface CheckoutButtonProps {
  bookingId: number;
}

/** Props for Empty component */
export interface EmptyProps {
  resourceName: string;
}

/** Props for Checkbox UI component */
export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id?: string;
  children: ReactNode;
}

/** Props for DataItem UI component */
export interface DataItemProps {
  icon: ReactElement;
  label: string;
  children: ReactNode;
}

/** Props for FormRow component */
export interface FormRowProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

/** Props for Pagination component */
export interface PaginationProps {
  count: number;
}

/** Props for Filter component */
export interface FilterProps {
  filterField: string;
  options: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
}

/** Props for SortBy component */
export interface SortByProps {
  options: SortByOption[];
}

export interface SortByOption {
  value: string;
  label: string;
}

/** Row component type prop */
export interface RowProps {
  type?: "horizontal" | "vertical";
  children: ReactNode;
}

/** Heading component */
export interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
}

/** Button component */
export interface ButtonProps {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactElement;
  type?: "button" | "submit" | "reset";
}

export interface PaginationButtonProps {
  active?: boolean;
}

/** Form component */
export interface FormProps {
  type?: "regular" | "modal";
  onSubmit?: (e: React.FormEvent) => void;
  children: ReactNode;
}

/** Flag component */
export interface FlagProps {
  src: string;
  alt: string;
}

/** ProtectedRoute component */
export interface ProtectedRouteProps {
  children: ReactNode;
}

// ==========================================
// Dark Mode Context
// ==========================================

/** DarkMode context value */
export interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

/** Select component props */
export interface SelectProps {
  options?: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: string;
}

/** Table column configuration (if used generically) */
export interface TableColumn {
  field: string;
  headerName: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface TableContextType {
  columns: string;
}
export interface TableProps {
  columns: string;
  children: ReactNode;
}

export interface MenusContextType {
  openId: string | number;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string |number>>;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

export interface SignupForm extends SignupCredentials {
  passwordConfirm: string;
}

export interface UpdatePasswordForm {
  password: string;
  passwordConfirm: string;
}
