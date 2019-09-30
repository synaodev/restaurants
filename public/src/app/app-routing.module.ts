import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { DisplayComponent } from './display/display.component';
import { ReviewComponent } from './review/review.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/restaurants' },
  { path: 'restaurants', component: DisplayComponent },
  { path: 'restaurants/create', component: CreateComponent },
  { path: 'restaurants/:id', component: DetailsComponent },
  { path: 'restaurants/:id/review', component: ReviewComponent },
  { path: 'restaurants/:id/update', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
