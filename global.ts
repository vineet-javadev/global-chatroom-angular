import { signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const username = signal('John Doe');
export const flag = signal(false);

export const selectedServer = signal('server-global');