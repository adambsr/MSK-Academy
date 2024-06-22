import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';  
import { ActivatedRoute, Router } from '@angular/router';
///import { SettingsService } from '../services/settings.service';
//import   StatusHttp from './StatusHttp.json'  ;  
// Role:   1: Employee / 2: PROF / 3: Student
// Permissions:  1: Contact Eleve  /  2 : Stream /  3: Admin

export class Config {

  ServerPath: string  = "https://localhost:44396/";
  AngularPath: string = "http://localhost:4200/";
  assetsPath: string = "assets/";
  ServerLinkPagination: string ="";

  Today: Date =  new Date();
  TodayText: string =  new Date().toLocaleDateString();

  pageSize: number = 20; //Same pagesize As appconfig.NET
  
 

  constructor( ) { }

  public header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${localStorage.getItem('accesstoken')}`)
  }

   


  getServerPath(): string{
    return this.ServerPath;
  }

// ApiUrl
  getAPIPath(): string {
    return this.ServerPath+"api/";
  }

// PhotoUrl
  getPhotoPath(folder : string): string{

    let p = this.ServerPath;

    switch(folder) { 
      
      case 'users': case 'employee':  { 
        return p+"Assets/Images/Users/";
         break; 
      } 
      case 'courses': { 
        return p+"Assets/Images/CoursesImages/";
         break; 
      } 

      case 'lessons': { 
        return p+"Assets/Images/LessonsImages/";
         break; 
      } 

      case 'badges': { 
        return p+"Assets/Images/Badges/";
         break; 
      } 

      case 'meets': { 
        return p+"Assets/Images/Meets/";
         break; 
      } 

      case 'events': { 
        return p+"Assets/Images/Events/"; 
        break; 
      } 
     
      case 'sliders': { 
        return p+"assets/images/sliders/"; 
        break; 
      }
      case 'Units': { 
        return p+"assets/images/Units/"; 
        break; 
      }
      case 'categories': { 
        return p+"Assets/Images/Categories/"; 
        break; 
      } 
      default: { 
        return p+"assets/images/"; 
         break; 
      } 
   } 
     
  }

// ------------------------------------------------------------------------------

// PhotoUrl
getVideoPath(folder : string): string{

  let p = this.ServerPath;

  switch(folder) { 
 
    case 'lessons': { 
      return p+"/Assets/Videos/LessonsVideos/";
       break; 
    } 
 
    default: { 
      return ""; 
       break; 
    } 
 } 
   
}


getFilePath(folder : string): string{

  let p = this.ServerPath;

  switch(folder) { 
 
    case 'streams': { 
      return p+"Assets/Files/StreamsFiles/";
       break; 
    } 

    case 'lessons': { 
      return p+"Assets/Files/LessonsFiles/";
       break; 
    } 
 
    default: { 
      return ""; 
       break; 
    } 
 } 
   
}


// CRUDUrl
  CRUDAPIPath(c : string): string{

    let p = this.getAPIPath();

    switch(c) { 
      case 'users': { 
        return p+"Users/";
         break; 
      }
      case 'courses': { 
        return p+"Courses";
         break; 
      } 
      case 'auth': { 
        return p+"Auth/";
         break; 
      } 
      case 'login': { 
        return p+"Auth/login/"; 
        break; 
      } 
      case 'signup': {
        return p+"Auth/SignUp/"; 
        break; 
      } 
      default: { 
        return p+"Auth/"; 
         break; 
      } 
   } 
     
  }

  // **********************************************************************

  ReturnStatusFromJson(error: any)
  {

    // for (let items of this.Status) {
    //   console.log("object:", items);
    //   for (let key in items) {
    //       console.log("      key:", key, "value:", items[key]);
    //   }
    // }
  }

  ReturnStatus(error: number)
  {
    switch(error) { 
      case 0: case 400: { 
        return "Error Server Connexion";
         break; 
      }
      case 401: case 403: { 
        return "Session not Authorized";
         break; 
      }
      
      case 201: case 200: case 202: {  // Successful State
        return true;
         break; 
      }

      // case 302: case 304: { //Duplicated values
      //   return false;
      //    break; 
      // }
      
      default: { 
        return false; 
         break; 
      } 
   }
  }

  Reconvertword(str:any): string 
  {
          if(str!="" && str!=undefined){
            let  str1:any = str.replaceAll("#@1", "'");
            let  str2:any = str1; 
            let  str3:any = str2.replaceAll("#@3", ",");
            let  str4:any = str3.replaceAll("#@4", ".");
            let  str5:any = str4.replaceAll("#@5", "+");
            let  str6:any = str5.replaceAll("#@6", "-");
            let  str7:any = str6.replaceAll("#@7", "=");
            let  str8:any = str7.replaceAll("#@8","(");
            let  str9:any = str8.replaceAll("#@9", ")");
            let  str10:any = str9.replaceAll("#@J1", "/");
            return str10;
          }else{ return ""; }
  }

  addHoursToDate(date: Date, hours: number): Date {
    return new Date(new Date(date).setHours(date.getHours() + hours));
  }

  SaoudiTimeZoneToDate(date: Date): Date {
    let newDate : Date = new Date(date);
    let h: number = newDate.getHours();
    h=h+3;
   // return newDate.setHours(newDate.getHours() + 3).toString();
   let newD: Date = new Date(newDate.setHours(h));
   return newD;
  }


  // hasPermission(n : number) : boolean{
   
  //   //let p : string = this.decryptToken();
  //   //console.log("Permissions = "+p);

  //   if(p.indexOf(n.toString())>-1){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  PageAdminPermission(page : string) : boolean{
    // all page name same AppRouting
   //console.log("Page = "+page);
    switch(page) {
      case 'board': { return true; break; } 
      case 'users': { return true; break; } 
      case 'employees': { return true; break; } 
      case 'languages': { return true; break; } 
      case 'reviews': { return true; break; } 
      case 'payments': { return true; break; } 
      case 'events': { return true; break; }
      case 'courses': { return true; break; }
      case 'units': { return true; break; } 
      case 'discussions': { return true; break; } 
      case 'lessons': { return true; break; } 
      case 'messages': { return true; break; } 
      case 'notifications': { return true; break; } 
      case 'payments': { return true; break; } 
      case 'profile': { return true; break; } 
      case 'settings': { return true; break; } 
      case 'streams': { return true; break; } 
      case 'sessions': { return true; break; } 
      case 'students': { return true; break; } 
      case 'comments': { return true; break; } 
      case 'MSKerrors': { return true; break; } 
      // case 'comments': { return true; break; } 
      // case 'comments': { return true; break; } 
      // case 'users': { return true; break; } 
       
      case '': { return true; break; } 
       
      default: { 
        return false; 
         break; 
      }
    }
}

// TestHasPermission(page: string) : boolean {
//   //console.log(page);
//   var splitted = page.split("/", -1); 
//   //console.log(splitted);
//   //console.log(" Token= "+this.hasPermission(3)+' Page = '+this.PageAdminPermission(splitted[1]));
 
//     // if( this.PageAdminPermission(splitted[1]) == this.hasPermission(3)){
//     //   return true;
//     // }else{
//     //   return false;
//     //   //console.log("PagePermission no "+this.PageAdminPermission(splitted[1]));
//     // }
  
  
// }

} // end
