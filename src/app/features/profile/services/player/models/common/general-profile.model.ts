export interface IGeneralProfile {
    Photo: string | null;
    FirstName: string;
    LastName: string;
    Biography: string | null;
    Birthday: Date | string | null;
    City: string;
    Tags: string[] | null;
    FreePlay: boolean;
    Availability: {
        Days: number[] | null;
        From: string | null;
        To: string | null;
    }
}