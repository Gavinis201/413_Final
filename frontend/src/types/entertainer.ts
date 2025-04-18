export interface Entertainer {
  entertainerId: number;
  entStageName: string;
  entSsn: string | null;
  entStreetAddress: string | null;
  entCity: string | null;
  entState: string | null;
  entZipCode: string | null;
  entPhoneNumber: string | null;
  entWebPage: string | null;
  entEmailAddress: string | null;
  dateEntered: string | null;
  bookingCount: number;
  lastBookedDate: string | null;
}

export interface NewEntertainer {
  stageName: string;
} 