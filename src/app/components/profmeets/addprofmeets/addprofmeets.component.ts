import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MeetsService } from 'app/Services/meets.service';
import { CoursesService } from 'app/Services/courses.service';
import { Config } from 'app/Config/Config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprofmeets',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslocoModule,
    FormsModule,
    MatFormFieldModule,
    NgClass,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatDatepickerModule,
],
  templateUrl: './addprofmeets.component.html',
  styleUrl: './addprofmeets.component.scss'
})
export class AddprofmeetsComponent {

  meetForm: UntypedFormGroup;
  Courses : any;

  public Config: Config = new Config;
  APIUrl : string = this.Config.getAPIPath();

  photoName: string = "emptyimg.jpg";
  photoUrl : string =this.Config.getPhotoPath("lessons");
  photo: string = this.photoUrl+ this.photoName;

  constructor(
    private translocoService: TranslocoService,
    private formBuilder: UntypedFormBuilder,
    private meetsService: MeetsService,
    private CoursesService: CoursesService,
    private router: Router
   
) {}

ngOnInit() {

      this.meetForm = this.formBuilder.group({
        IdCourse : [null],
        TitleMeet: ['', Validators.required],
        LinkMeet : ['', Validators.required],
        DateMeet : ['', Validators.required],
        DescriptionMeets : ['', Validators.required],
      });

      this.CoursesService.getcourses().subscribe(
        (res: any) => {
          this.Courses = res;
          //this.Role=res;
          console.log(res);
        },
        (error: any) => {
          console.log(error);
          if (error.status == 400 || error.status == 0) {
            // Bad Request
            alert("Error Connexion Server");
          }
        }
      );
}

escapeSpecialCharacters(input: string): string {
  // Map of special characters and their escaped equivalents
  const escapeMap: { [key: string]: string } = {
      '\n': '\\n',
      '\t': '\\t',
      '\\': '\\\\',
      '\'': '\\\'',
      '\"': '\\\"'
      // Add more special characters and their escaped equivalents as needed
  };

  // Replace each special character with its escaped equivalent
  return input.replace(/[\n\t\\'"]/g, match => escapeMap[match]);
}

submit() {
  //alert(this.meetForm.value['IdCourse']);
  const IdCourse = Number(this.meetForm.value['IdCourse']);
  const TitleMeet = this.escapeSpecialCharacters(this.meetForm.value['TitleMeet']);
  //alert(TitleMeet);
  const LinkMeet = this.escapeSpecialCharacters(this.meetForm.value['LinkMeet']);
  //alert(LinkMeet);
  const DateMeet = this.meetForm.value['DateMeet'];
  const DescriptionMeets = this.escapeSpecialCharacters(this.meetForm.value['DescriptionMeets']);
 // alert(DateMeet);
  
 const val= {IdCourse,TitleMeet,LinkMeet,DateMeet,DescriptionMeets}; 
 console.log(val);

   this.meetsService.addMeet(val).subscribe((result: any)=>{
     console.log(result); 
     if(result.StatusCode == 302){ 
      // duplicated
       alert("Error duplicated");
     }else if(result.StatusCode == 200 || result.StatusCode == 1000 ){
       this.router.navigateByUrl('dashboard/profmeets/view/1');
     }else if(result.StatusCode == 0){
       alert("Video not Able to Upload");   
     }else{
       //alert(result);
     }
    
   }),(errors: any) => {

     console.log(errors);
       if(errors.status == 400 || errors.status == 0  || errors.status == 404 || errors.status == 403){
       // Bad Request Unauthorized 
         alert("Error Connexion Server or Session");
       }
       
     };

}

 uplodPhoto(event: any): void{
 const file = event.target.files[0];
 const formaData: FormData= new FormData();
 formaData.append('uploadedFile',file,file.name);
 this.meetsService.uploadPhoto(formaData).subscribe((data: any)=>{
   console.log(data);
   this.photoName=data.toString();
   this.photo =this.photoUrl+this.photoName;
 });
 }

}
  
 




 
