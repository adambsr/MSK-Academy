import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
import { LessonsService } from 'app/Services/lessons.service';
import { CoursesService } from 'app/Services/courses.service';
import { Config } from 'app/Config/Config';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-addproflessons',
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
  templateUrl: './addproflessons.component.html',
  styleUrl: './addproflessons.component.scss'
})
export class AddproflessonsComponent {

  Categories: any;
  Courses: any;
  lessonForm: UntypedFormGroup;

  public Config: Config = new Config;
  APIUrl: string = this.Config.getAPIPath();
  photoName: string = "emptyimg.jpg";
  photoUrl: string = this.Config.getPhotoPath("lessons");
  photo: string = this.photoUrl + this.photoName;

  videoName: string = "";
  videoUrl: string = this.Config.getVideoPath("lessons");
  video: string = this.videoUrl + this.videoName;
  myVideos: string[] = [];

  fileName: string = "";
  fileUrl: string = this.Config.getFilePath("lessons");
  file: string = this.fileUrl + this.fileName;
  myFiles: string[] = [];

  progress: number = 0;

  myId: number = Number(localStorage.getItem('userid'));
  myProf: any = localStorage.getItem('prof');
  selectedProf: number = Number(this.myId); // if is prof

  constructor(
    private translocoService: TranslocoService,
    private formBuilder: UntypedFormBuilder,
    private LessonsService: LessonsService,
    private CoursesService: CoursesService,
    private router: Router

  ) { }
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
      IdCourse: [null],
      TitleLesson: ['', Validators.required],
      DescriptionLesson: ['', Validators.required],
      SubTitleLesson: ['', Validators.required],
      ContentLesson: ['', Validators.required],
      OrderLesson: ['', Validators.required],
      PictureLesson: [''],
    });
  }

  uploadPhoto(event: any): void {
    const file = event.target.files[0];
    const formaData: FormData = new FormData();
    formaData.append('uploadedFile', file, file.name);
    this.LessonsService.uploadPhoto(formaData).subscribe((data: any) => {
      console.log(data);
      this.photoName = data.toString();
      this.photo = this.photoUrl + this.photoName;
    });
  }

  submit() {
    const TitleLesson = this.lessonForm.value['TitleLesson'];

    const SubTitleLesson = this.lessonForm.value['SubTitleLesson'];

    const DescriptionLesson = this.lessonForm.value['DescriptionLesson'];

    const ContentLesson = this.lessonForm.value['ContentLesson'];

    const PictureLesson = this.photoName;

    const OrderLesson = Number(this.lessonForm.value['OrderLesson']);

    const IdCourse = Number(this.lessonForm.value['IdCourse']);

    const val = { IdCourse, TitleLesson, SubTitleLesson, DescriptionLesson, ContentLesson, OrderLesson, PictureLesson };
    console.log(val);

    this.LessonsService.addLesson(val).subscribe((result: any) => {
      console.log(result); // return id lesson 
      console.log("videos = " + this.myVideos);

      for (let index = 0; index < this.myVideos.length; index++) {
        const TitleVideo = this.myVideos[index];
        const IdLesson = result.id;
        let vall = { TitleVideo, IdLesson };
        console.log(vall);
        this.LessonsService.addVideo(vall).subscribe((data: any) => {
          console.log('data = ' + data);
        });
      }

      for (let index = 0; index < this.myFiles.length; index++) {

        const TitleFile = this.myFiles[index];
        const TypeFile = "";
        const DateFile = "";
        const IdCourse = 0;
        const IdMeet = 0;
        const IdLesson = result.id;

        let vall = { TitleFile, TypeFile, DateFile, IdCourse, IdMeet, IdLesson };  //selon names and order Back
        console.log(vall);
        this.LessonsService.addFile(vall).subscribe((data: any) => {
          console.log('data = ' + data);
        });
      }

      if (result.StatusCode == 302) {
        // duplicated
        alert("Error duplicated");
      } else if (result.StatusCode == 200 || result.StatusCode == 1000 || result.StatusCode == 1001) {
        this.router.navigateByUrl('dashboard/proflessons/view/1');
      } else if (result.StatusCode == 0) {
        alert("Video failed to upload!");
      } else {
        //alert(result);
      }
    }), 
    (errors: any) => {
      console.log(errors);
      if (errors.status == 400 || errors.status == 0 || errors.status == 404 || errors.status == 403) {
        // Bad Request Unauthorized 
        alert("Error Connexion Server or Session");
      }

    };

  }

  //TODO:Video too Long not return Erreur or Try Caption to say Error to user
  uploadVideo(event: any): void {
    const file = event.target.files[0];
    const formaData: FormData = new FormData();
    formaData.append('uploadedFile', file, file.name);
    console.log(formaData);
    this.LessonsService.uploadVideo(formaData).subscribe((events: any) => {
      console.log(events);

      // this.videoName=data.toString();
      if (events.status == 0) {
        alert("Video failed to upload!");
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
      this.myVideos.splice(this.myVideos.indexOf(name));
    });
  }

  uploadFile(e: any) {
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
    });
  }
}
