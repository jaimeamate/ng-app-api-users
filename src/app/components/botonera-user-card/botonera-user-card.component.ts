import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-botonera-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera-user-card.component.html',
  styleUrl: './botonera-user-card.component.css'
})
export class BotoneraUserCardComponent {
  router: Router = inject(Router)
  @Input() parent: string = ''
  @Input() user:IUser | any
  usersServices: UsersService = inject(UsersService)

  async deleteUser(): Promise<any> {
    let borrar = confirm(`Vas a eliminar el usuario ${this.user.username}, ¿estás seguro?`)
    if(borrar){
      let deleteAction =  await this.usersServices.delete(this.user._id)
      await deleteAction.subscribe( (response:IUser | any) => {
        if(response._id){
          alert(`Se ha eliminado el ususrio '${response.username}' se ha eliminado correctamente`)
          this.router.navigate(['/home'])
        }else{
          alert(response.error)
        }
      })
    }
  }
}
