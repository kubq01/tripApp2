import {User} from "../user/User";

/*
class Trip{
    private name: string;
    private organizer: User;

    constructor(name: string, user: User) {
       this.name = name;
       this.organizer = user;
    }

    getName(): string {
        return this.name;
    }

    getOrganizer(): User {
        return this.organizer;
    }

}

export default Trip

 */

export type Trip = {
    name: String,
    organizer: User
    participants: User[]
}