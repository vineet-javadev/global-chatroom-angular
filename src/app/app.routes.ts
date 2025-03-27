import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonalRoomComponent } from './personal-room/personal-room.component';
import { RoomComponent } from './room/room.component';

export const routes: Routes = [
    {
        component: HomeComponent,
        path: '',
    },
    {
        component: HomeComponent,
        path: 'home'
    },
    {
        component: RoomComponent,
        path: 'room'
    },
    {
        component: PersonalRoomComponent,
        path: 'personal-room'
    },
    {
        component: PageNotFoundComponent,
        path: '**'
    }
];