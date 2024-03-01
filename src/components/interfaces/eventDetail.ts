export interface EventDetail {
    _id: string;
    title: string;
    flyerFront?: string;
    attending: number;
    date: string;
    startTime: string;
    endTime: string;
    contentUrl: string;
    venue: {
        name: string;
        direction: string;
    }
    pick?: {
        blurb: string
    }
    city: string;
}
