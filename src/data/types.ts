export interface IChadAttributeMetaData {
  dbName: string,
  displayName: string
}

export interface IChadProfileType {
  age: IChadAttributeMetaData;
  chad_or_gdp: IChadAttributeMetaData;
  environment: IChadAttributeMetaData;
  facial_expression: IChadAttributeMetaData;
  facial_hair: IChadAttributeMetaData;
  hair_style: IChadAttributeMetaData;
  fashion_style: IChadAttributeMetaData;
  height: IChadAttributeMetaData;
  nationality: IChadAttributeMetaData;
  profession: IChadAttributeMetaData;
  yearly_income: IChadAttributeMetaData;
}