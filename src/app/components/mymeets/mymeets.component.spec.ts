import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymeetsComponent } from './mymeets.component';

describe('MymeetsComponent', () => {
  let component: MymeetsComponent;
  let fixture: ComponentFixture<MymeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MymeetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MymeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
