import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';

import { WelcomeComponent } from './welcome.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailProviderMailgunService } from '../mail-provider-mailgun.service';
import { MailProviderSendgridService } from '../mail-provider-sendgrid.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCheckboxModule
      ],
      providers: [
        {
          provide: MailProviderMailgunService,
          useValue: {}
        },
        {
          provide: MailProviderSendgridService,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
