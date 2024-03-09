import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  @Input() user:IUser | any
  usersServices: UsersService = inject(UsersService)

  deleteUser(): void {
    let borrar = confirm(`Vas a eliminar el usuario ${this.user.username}, ¿estás seguro?`)
    if(borrar){
      let result =  this.usersServices.delete(this.user._id)
      if(result.error){
        alert(result.error)
      }else{
        alert(`Se ha eliminado el ususrio '${this.user.username}' correctamente`)
      }
    }
  }
}
