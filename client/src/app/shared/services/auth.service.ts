import { Injectable } from '@angular/core';
import { User } from '../Interfaces';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AuthService {

    constructor(private http: HttpClient){

    }

    login(user : User) {
       return this.http.post('/api/auth/login', user)
    }

    register() {}
}