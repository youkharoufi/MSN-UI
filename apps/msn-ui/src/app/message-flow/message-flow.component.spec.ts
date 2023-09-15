import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageFlowComponent } from './message-flow.component';

describe('MessageFlowComponent', () => {
  let component: MessageFlowComponent;
  let fixture: ComponentFixture<MessageFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageFlowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
