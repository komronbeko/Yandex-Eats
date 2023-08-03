export interface IRestourantBody {
  id?: number;
  name: string;
  owner: string;
  business_hours: string;
  email: string;
  password: string;
  contact_number: string;
  card_details: object;
  longitude: number;
  latitude: number;
  founded_at: number;
}

export interface IRestourantVerify {
  restaurant_id: number;
  is_verified: boolean;
}