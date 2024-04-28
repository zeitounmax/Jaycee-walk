export interface EventRecord {
  record: {
    fields: {
      lat: number;
      lon: number;
      label: string;
      title_fr: string;
      location_address: string;
      description_fr: string;
      image?: string;
    };
  };
}
interface ApiResponse {
  records: EventRecord[];
}

export async function fetchEventLocations(): Promise<EventRecord[]> {
  const url =
    "https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-openagenda/records?start=0&rows=100";
  const response = await fetch(url);
  const data: ApiResponse = await response.json();

  return data.records;
}
