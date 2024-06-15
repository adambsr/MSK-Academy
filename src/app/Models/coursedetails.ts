export interface Coursedetails {
    Course: {
        IdCourse: number;
        Title: string;
        Subtitle: string;
        Description: string;
        PictureCourse: string;
        DurationHour: number;
        Active: number;
    };
    Lessons: {
        IdLesson: number;
        Title: string;
        Description: string;
        PictureLesson: string;
        Order: number;
    }[];
    CategoryName: string;
    TutorName: string;
    PictureTutor: string;
}