import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpEventType } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Config } from 'app/Config/Config';
import { LessonsService } from 'app/Services/lessons.service';
import { CoursesService } from 'app/Services/courses.service';

@Component({
  selector: 'app-editproflessons',
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
  templateUrl: './editproflessons.component.html',
  styleUrl: './editproflessons.component.scss'
})
export class EditproflessonsComponent {
  Categories: any;
  Courses: any;
  lessonForm: UntypedFormGroup;

  public Config: Config = new Config;
  APIUrl: string = this.Config.getAPIPath();
  photoName: string = "anonymous.jpg";
  photoUrl: string = this.Config.getPhotoPath("lessons");
  photo: string = this.photoUrl + this.photoName;

  videoName: string = "";
  videoUrl: string = this.Config.getVideoPath("lessons");
  video: string = this.videoUrl + this.videoName;
  myVideos: string[] = [];
  myVideosObj: { idv: any, name: string }[] = [];
  myNewVideos: string[] = [];

  fileName: string = "";
  fileUrl: string = this.Config.getFilePath("lessons");
  file: string = this.fileUrl + this.fileName;
  myFiles: string[] = [];
  myFilesObj: { idv: any, name: string }[] = [];
  myNewFiles: string[] = [];

  progress: number = 0;

  myId: number = Number(localStorage.getItem('userid'));
  myProf: any = localStorage.getItem('prof');
  selectedProf: number = Number(this.myId); // if is prof
  idLesson: number;

  ToogleActive: boolean = false;
  toggleValue: boolean = false;
  toggleControl: FormControl;


  constructor(

    private translocoService: TranslocoService,
    private formBuilder: UntypedFormBuilder,
    private LessonsService: LessonsService,
    private CoursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    // this.translocoService.setActiveLang('en'); // Set the initial language

    this.translocoService.load('en').subscribe(() => {
      this.translocoService.setActiveLang('en'); // Set the initial language
    });

    this.route.params.subscribe((params: Params) => {
      this.idLesson = params['id'];
    }
    );

  }
  // fixedSubscriptInput: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // dynamicSubscriptInput: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // fixedSubscriptInputWithHint: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);


  ngOnInit() {

    if (localStorage.getItem('tokenn') == '1') {
      this.selectedProf = 0;
      localStorage.setItem('prof', this.selectedProf.toString());
    } else {
      this.selectedProf = Number(this.myId);
      this.myProf = Number(this.myId);
      localStorage.setItem('prof', this.selectedProf.toString());
    }

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



    this.lessonForm = this.formBuilder.group({
      //email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
      //password  : ['admin', Validators.required],
      //rememberMe: [''],
      IdCourse: [null],
      TitleLesson: ['', Validators.required],
      DescriptionLesson: ['', Validators.required],
      SubTitleLesson: ['', Validators.required],
      ContentLesson: ['', Validators.required],
      OrderLesson: ['', Validators.required],
      //PictureLesson : ['', Validators.required],
    });

    this.LessonsService.getById(this.idLesson).subscribe((data) => {
      console.log(data);

      // if(data[0].Active == 1){
      //     //alert('Mrigla');
      //     this.toggleControl.setValue(true);
      //     this.toggleValue = true;
      //     this.ToogleActive = true;
      // }else{
      //     this.toggleControl.setValue(false);
      //     this.ToogleActive = false;
      //     //alert("mchouma");
      // }
      //alert(this.ToogleActive);
      this.lessonForm = this.formBuilder.group({
        //email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
        //password  : ['admin', Validators.required],
        //rememberMe: [''],
        IdCourse: [data[0].IdCourse],
        TitleLesson: [data[0].TitleLesson, Validators.required],
        DescriptionLesson: [data[0].DescriptionLesson, Validators.required],
        SubTitleLesson: [data[0].SubTitleLesson, Validators.required],
        ContentLesson: [data[0].ContentLesson, Validators.required],
        OrderLesson: [data[0].OrderLesson, Validators.required],
        //PictureLesson : [data[0].PictureLesson, Validators.required],
      });

      this.photo = this.photoUrl + data[0].PictureLesson;
      this.photoName = data[0].PictureLesson;

      this.LessonsService.getVideosLesson(this.idLesson).subscribe((res: any) => {
        console.log("Listes des videos :");
        console.log(res);
        for (let index = 0; index < res.length; index++) {
          this.myVideosObj.push(res[index].IdVideo, res[index].TitleVideo);
          this.myVideos.push(res[index].TitleVideo);
        }
        console.log("myVideosObj Contient vvvv");
        console.log(this.myVideosObj);
      });

      this.LessonsService.getFilesLesson(this.idLesson).subscribe((res: any) => {
        console.log("Listes des fichiers :");
        console.log(res);
        for (let index = 0; index < res.length; index++) {
          this.myFilesObj.push(res[index].IdFile, res[index].TitleFile);
          this.myFiles.push(res[index].TitleFile);
        }


      });

      // this.TitleEn = data[0].TitleEn;
      // this.Description = data[0].Description;
      // this.CategoryImage = data[0].CategoryImage;
      // this.IdParentCateg = data[0].IdParentCateg;
    });
  }



  ChangeCourses(e: any) {
    //alert("test");
    console.log(e.target.value);
    let id_lang: number = e.target.value;
    // this.UnitsService.getCoursesByLang(id_lang,this.selectedProf).subscribe((res: any)=>{
    //   console.log(res);
    //   this.Courses = [];
    //   if(res != "Empty"){
    //     this.Courses = res;
    //   }

    // },(error: any) => {
    //        console.log(error);
    //   if(error.status == 400 || error.status == 0){
    //     // Bad Request
    //     alert("Error Connexion Server");
    //   }
    // });
  }


  submit() {

    const IdLesson = Number(this.idLesson);

    const TitleLesson = this.lessonForm.value['TitleLesson'];

    const SubTitleLesson = this.lessonForm.value['SubTitleLesson'];

    const DescriptionLesson = this.lessonForm.value['DescriptionLesson'];

    const ContentLesson = this.lessonForm.value['ContentLesson'];

    const PictureLesson = this.photoName;

    const OrderLesson = Number(this.lessonForm.value['OrderLesson']);

    const IdCourse = Number(this.lessonForm.value['IdCourse']);



    const val = { IdLesson, IdCourse, TitleLesson, SubTitleLesson, DescriptionLesson, ContentLesson, OrderLesson, PictureLesson }; // Order and names selon Model BackEnd
    console.log(val);

    this.LessonsService.update(val).subscribe((result: any) => {
      console.log(result); // return id lesson 
      console.log("videos = " + this.myVideos);

      for (let index = 0; index < this.myVideos.length; index++) {
        const TitleVideo = this.myNewVideos[index];
        const IdLesson: Number = Number(this.idLesson);
        const TypeVideo = "";
        const IdCourse = 0;

        let vall = { TitleVideo, TypeVideo, IdLesson, IdCourse };
        console.log('vall vvv');
        console.log(vall);

        this.LessonsService.addVideo(vall).subscribe((data: any) => {
          console.log("Add Video API return vvvv");
          console.log(data);
        });
      }

      for (let index = 0; index < this.myFiles.length; index++) {

        const TitleFile = this.myNewFiles[index];
        const TypeFile = "";
        const DateFile = "";
        const IdCourse = 0;
        const IdMeet = 0;
        const IdLesson: number = Number(this.idLesson);

        let vall = { TitleFile, TypeFile, DateFile, IdCourse, IdMeet, IdLesson };  //selon names and order Back
        console.log('vall Of File vvvv');
        console.log(vall);
        this.LessonsService.addFile(vall).subscribe((data: any) => {
          console.log('data = ' + data);
        });
      }

      if (result.StatusCode == 302) { // duplicated
        alert("Error duplicated");
      } else if (result.StatusCode == 200 || result.StatusCode == 1000) {
        this.router.navigateByUrl('dashboard/proflessons/view/1');
      } else if (result.StatusCode == 0) {
        alert("Video not Able to Upload");
      } else {
        //alert(result);
      }

    }), (errors: any) => {

      console.log(errors);
      if (errors.status == 400 || errors.status == 0 || errors.status == 404 || errors.status == 403) {
        // Bad Request Unauthorized 
        alert("Error Connexion Server or Session");
      }

    };

  }


  uplodPhoto(event: any): void {
    const file = event.target.files[0];
    const formaData: FormData = new FormData();
    formaData.append('uploadedFile', file, file.name);
    this.LessonsService.uploadPhoto(formaData).subscribe((data: any) => {
      console.log(data);
      this.photoName = data.toString();
      this.photo = this.photoUrl + this.photoName;

    });
  }

  //TODO:Video too Long not return Erreur or Try Caption to say Error to user
  uplodVideo(event: any): void {
    const file = event.target.files[0];
    const formaData: FormData = new FormData();
    formaData.append('uploadedFile', file, file.name);
    console.log(formaData);
    this.LessonsService.uploadVideo(formaData).subscribe((events: any) => {
      console.log(events);

      // this.videoName=data.toString();
      if (events.status == 0) {
        alert("Video not Able to Upload");
      }

      this.video = this.videoUrl + this.videoName;

      switch (events.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(events.loaded / events.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('successfully created!', events.body);

          this.videoName = events.body;
          this.myVideos.push(this.videoName);
          this.myNewVideos.push(this.videoName);

          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    }), (errors: any) => {

      //console.log(errors);
      if (errors.status == 400 || errors.status == 0 || errors.status == 404 || errors.status == 403) {
        // Bad Request Unauthorized 
        alert("Error Upload Video to Server");
      }

    };
  }

  DeleteVideo(name: string) {
    this.LessonsService.deleteVideo(name).subscribe((data: any) => {
      console.log(data);
      this.myVideos.splice(this.myVideos.indexOf(name), 1);
      this.myNewVideos.splice(this.myNewVideos.indexOf(name), 1);
    });
  }

  uplodFile(e: any) {
    const file = e.target.files[0];
    const formaData: FormData = new FormData();
    formaData.append('uploadedFile', file, file.name);
    console.log(formaData);
    this.LessonsService.uploadFiles(formaData).subscribe((events: any) => {
      console.log(events);

      // this.videoName=data.toString();
      if (events.status == 0) {
        alert("File not Able to Upload");
      }

      this.file = this.fileUrl + this.fileName;

      switch (events.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(events.loaded / events.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', events.body);

          this.fileName = events.body;
          this.myFiles.push(this.fileName);
          this.myNewFiles.push(this.fileName);

          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    }), (errors: any) => {

      //console.log(errors);
      if (errors.status == 400 || errors.status == 0 || errors.status == 404 || errors.status == 403) {
        // Bad Request Unauthorized 
        alert("Error Upload Video to Server");
      }

    };
  }

  DeleteFile(name: string) {
    this.LessonsService.deleteFile(name).subscribe((data: any) => {
      console.log(data);
      this.myFiles.splice(this.myFiles.indexOf(name));
      this.myNewFiles.splice(this.myNewFiles.indexOf(name), 1);
    });
  }
}
