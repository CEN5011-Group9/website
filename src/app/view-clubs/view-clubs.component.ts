import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user'

@Component({
  selector: 'app-view-clubs',
  templateUrl: './view-clubs.component.html',
  styleUrls: ['./view-clubs.component.scss']
})
export class ViewClubsComponent {

  constructor(
    private readonly $http : HttpClient,
    private readonly $router : Router
  ) { }

  clubDetails : any

  clubApiPath : any

  currentUserDetailsString = localStorage.getItem('userDetails') as string

  currentUserDetails = JSON.parse(this.currentUserDetailsString)

  findClubApiPath( user : User ) : string {
    console.log("The flow entered findClubApiPath() in view-clubs.component.ts ")
    if( user.role == 'Admin' ){
      return 'http://localhost:4200/api/user/allClubs/' + user.email
    } else if( user.role == 'ClubOwner' ){
      return 'http://localhost:4200/api/user/clubs/' + user.email 
    }

    return ""
  }

  ngOnInit(){
    this.clubApiPath = this.findClubApiPath(this.currentUserDetails.user)

    this.$http.get(this.clubApiPath)
        .subscribe({
          next : ( clubData : any ) =>{
            this.clubDetails = clubData
          }, 
          error : ( err : any ) =>{
            console.log( "The error that occurred was " + err )
          }
        })
  }

  delete( club : any ){
    console.log("The flow entered deleted() in view-clubs.component.ts ")
    console.log("The club mail id is " + club.email)
    let deleteApiPath = 'http://localhost:4200/api/club/delete/' + club.email

    this.$http.delete(deleteApiPath)
      .subscribe({
        next : ( data: any ) => {
          console.log("The club that got deleted or the response message we received is " + JSON.stringify(data))
          this.clubDetails = this.clubDetails.filter((c: any) => c.email !== club.email);
        },
        error : ( err : any ) => {
          console.log("The error that occurred in delete() in view-clubs.component.ts class is " + err )
        }
      })
  }

}
