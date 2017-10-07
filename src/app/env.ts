export const LANGUAGE = {
ENGLISH: "en",
}
export interface Environment 
{
language: string;
endPoint:string;

}

export const DEV: Environment = {
language:LANGUAGE.ENGLISH,
endPoint:'http://13.58.3.113/sbv/webservice' 

}

export const PROD: Environment = {
language:LANGUAGE.ENGLISH,
endPoint:'http://13.58.3.113/sbv/webservice' 
}
export const ENV: Environment = DEV; 