import {Note} from "./Note.tsx";

export type Plan = {
    id: number
    startDate: Date
    endDate: Date;
    description: string;
    additionalInfo: string;
    pricePerPerson: number;
    address: string;
    notes: Note[];
}