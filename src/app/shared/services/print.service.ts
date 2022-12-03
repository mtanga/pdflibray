import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpEvent, HttpParams, HttpRequest, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FunctionsService } from './functions.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  connect : boolean = false;
  httpHeader = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'*',
      'Accept': 'application/json, text/plain',
      'Access-Control-Allow-Credentials': 'true',
    })
  };

  



  constructor(
    private http: HttpClient,
    private router : Router,
    private notice : FunctionsService,
    
    
    ) {     }



  login(data:any, url){
    let ll = environment.url+url;
    console.log(ll, data, this.httpHeader);
    return  this.http.post(ll, data, this.httpHeader);
  }

  register(data:any, url){
    let ll = environment.url+url;
    console.log(ll, data, this.httpHeader);
    return  this.http.post(ll, data, this.httpHeader);
  }


isConnected(){
  this.connect = !this.connect
}
  



  handleError(error: HttpErrorResponse) {
    // this.load.hideLoader();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      console.log("reeeeeeeee")
      this.notice.showError("Votre demande ne peut être éxécuté actuellement. Veuillez réessayer ultérieurement!", "Serveur non joignable")
     // this.presentToast(error.error.message);
    } else {
      console.log("reeeeeeeee2")
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    //this.presentToast(error.status);
    // return an observable with a user-facing error message
      return throwError(
      'Something bad happened; please try again later.');
  };

//Get data
getData(url){
const headers = new HttpHeaders({
     // 'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
  return this.http.get(ll,{'headers':headers}).pipe( 
    retry(2),
    catchError(this.handleError)
  );
}


//Get data
getDatas(url, data){
  const headers = new HttpHeaders({
       // 'Authorization': 'Bearer '+token
      });
    let ll =environment.url+url;
   console.log(ll, data, {'headers':headers});
    return this.http.post(ll, data, {'headers':headers}).pipe( 
      retry(2),
      catchError(this.handleError)
    );
  }

addData(url){
    //let token = localStorage.getItem('token');
   // console.log(token)
    const headers = new HttpHeaders({
      //'Authorization': 'Bearer '+token
    });
  let ll =environment.url+url;
 // console.log(ll, {'headers':headers});
  return this.http.post(ll, {'headers':headers});
}
}
