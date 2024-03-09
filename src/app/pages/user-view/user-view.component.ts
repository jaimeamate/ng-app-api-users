import { Component, inject } from '@angular/core';
import { BotoneraUserCardComponent } from '../../components/botonera-user-card/botonera-user-card.component';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [BotoneraUserCardComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  activateRoute: ActivatedRoute = inject(ActivatedRoute)
  usersService: UsersService = inject(UsersService)
  user: IUser | any

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      const _id = params._id
      try {
        await this.usersService.getById(_id).subscribe((response:IUser | any) => {
          this.user = response
        })
      } catch (error) {
        alert(error)
      }
    })
  }

}
