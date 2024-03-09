import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: IUser[] = []
  usersServices: UsersService = inject(UsersService)

  async ngOnInit(): Promise<void> {
    // cuando el componente se carga pide los datos de los usuarios al servicio que conecta con la api
    await this.usersServices.getAll().subscribe((usersData:any) => {
      // los usuarios se encuentran en el array .results del objeto respuesta usersData como parametro
      this.users = usersData.results;
    })
  }
}
