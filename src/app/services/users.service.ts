import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  httpClient: HttpClient = inject(HttpClient)
  baseUrl: string = 'https://peticiones.online/api/users'
  
  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.baseUrl)
  }

  getById(_id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`)
  }

  delete(_id: string | undefined): Observable<IUser> | any {
    return this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`)
  }

  insert(formValues: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.baseUrl,formValues)
  }

  update(formValues: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.baseUrl}/${formValues._id}`,formValues)
  }

  // with promises
  // getAll(): Promise<IUser[]> {
  //   return lastValueFrom(this.httpClient.get<IUser[]>(this.baseUrl))
  // }

  // getById(_id: string): Promise<IUser> {
  //   return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`))
  // }

  // delete(_id: string): Promise<IUser> {
  //   return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`))
  // }

  // insert(formValues: IUser): Promise<IUser> {
  //   return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl,formValues))
  // }

  // update(formValues: IUser): Promise<IUser> {
  //   return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formValues._id}`,formValues))
  // }
}
