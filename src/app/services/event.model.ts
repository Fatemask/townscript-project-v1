export interface EventOnly {
    eventName: string;
    eventOrganizedBy: string;
    eventCategory: string;
    eventDescription: string;
    eventDate: Date;
    eventDueDate: Date;
    eventTickets: number;
    eventTecketPrice: number;
    eventThumbnailUrl: string;
    eventBannerUrl: string;
    eventRedirectUrl: string;
    is_sponsored: false;
    is_verified: false;
}