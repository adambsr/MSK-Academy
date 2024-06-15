export interface Users {
    IdUser: number;
    FirstName: string;
    LastName: string;
    Username: string;
    Password: string;
    NIC: number;
    Telephone: number;
    Email: string;
    BirthDate: Date;
    Gender: string;
    Address: string;
    IdCountry: number;
    IdState: number;
    IdCity: number;
    IdRole: number;  // Candidate : 1 // Tutor : 2 // Parent : 3 // Admin : 4
    FacebookId: string;
    GoogleId: string;
    RefreshToken: string;
    CreationDate: Date;
    IsVerified: Date;
    IsPremium: number;
    PremiumExpiry: Date;
    ProfilePicture: string;
    Active: number;
    Qualifications: string;
    Speciality: string;
    TeachingExperience: String;
}
