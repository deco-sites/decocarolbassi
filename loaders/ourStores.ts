export interface Props {
  lat: number;
  lng: number;
}
export default async function OurStoresLoader(
  { lat, lng }: Props,
) {
  const weather = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m&hourly=temperature_2m`,
  );
  return await weather.json() as {
    "current": {
      "time": string;
      "temperature_2m": number;
      "wind_speed_10m": number;
    };
    "hourly": {
      "time": Array<string>;
      "temperature_2m": Array<number>;
    };
  };
}
