import { IChadProfileType } from "./types";

export const MAX_NUM_TRIES = 2;
export const CHAT_COMPLETION_COUNT = 15;
export const HOURS_TO_RESET_SESSION = 5;

export const CHAD_PROFILE_ATTRIBS: IChadProfileType = {
  chad_or_gdp: { dbName: 'chad_or_gdp', displayName: 'Consequential Chad or GDP' },
  height: { dbName: 'height', displayName: 'Height' },
  age: { dbName: 'age', displayName: 'Age' },
  nationality: { dbName: 'nationality', displayName: 'Nationality' },
  profession: { dbName: 'profession', displayName: 'Profession' },
  yearly_income: { dbName: 'yearly_income', displayName: 'Yearly Income' },
  hair_style: { dbName: 'hair_style', displayName: 'Hair Style' },
  facial_hair: { dbName: 'facial_hair', displayName: 'Facial Hair' },
  fashion_style: { dbName: 'fashion_style', displayName: 'Fashion Style' },
  environment: { dbName: 'environment', displayName: 'Social Environment' },
  facial_expression: { dbName: 'facial_expression', displayName: 'Life Outlook' },
};