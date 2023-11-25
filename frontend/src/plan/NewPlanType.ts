import {Note} from "./Note.tsx";

export type NewPlanType = {

    startDate: Date
    endDate: Date;
    description: string;
    pricePerPerson: number;
    address: string;
    notes: string;
}