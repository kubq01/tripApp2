import Trip from "./Trip";
import User from "../user/User";

class TripInvite{
    private id: number;
    private trip: Trip;
    private invitedUser: User;

    constructor(id: number, trip: Trip, invitedUser: User) {
        this.id = id;
        this.trip = trip;
        this.invitedUser = invitedUser;
    }

    getTrip(){
        return this.trip;
    }

    getInvitedUser(){
        return this.invitedUser;
    }
}