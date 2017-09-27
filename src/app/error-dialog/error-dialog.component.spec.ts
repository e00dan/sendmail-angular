import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';
import { MD_DIALOG_DATA } from '@angular/material';

const EXAMPLE_ERROR_MESSAGE = 'Example error message!';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDialogComponent ],
      providers: [
        {
          provide: MD_DIALOG_DATA,
          useValue: {
            error: EXAMPLE_ERROR_MESSAGE
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data.error should be set on component', () => {
    expect(component.data['error']).toEqual(EXAMPLE_ERROR_MESSAGE);
  });

  it('error message should be rendered', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('p').textContent.trim()).toEqual(`Error: ${EXAMPLE_ERROR_MESSAGE}`);
  });
});
