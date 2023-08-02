export interface IRestourantBody {
    id?: number;
    name: string;
    owner: string;
    business_hours: string;
    email: string;
    password: string;
    contact_number: string;
    card_detailts: object;
    longitude: string;
    latitude: string;
    founded_at: number;
  }

  export interface IRestourantVerify {
    restaurant_id: number,
    is_verified: boolean
  }
