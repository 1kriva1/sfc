export interface IGetPlayersItemGeneralProfileModel {
    Photo: string | null;
    FirstName: string;
    LastName: string;
    Birthday: Date | null;
    City: string;
    Tags: string[] | null;
    FreePlay: boolean;
    Availability: {
        Days: number[] | null;
        From: string | null;
        To: string | null;
    }
}