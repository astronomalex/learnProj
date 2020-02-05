import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ShoppingListRoutingModule {

}
