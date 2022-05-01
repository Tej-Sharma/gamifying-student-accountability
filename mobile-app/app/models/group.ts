import { User } from "./user";
import { Habit } from "./habit";

export type Group = {
    name: string;
    users: Array<User>;
    habits: Array<Habit>;
    reminderTime: string;
    admin: User; 
};