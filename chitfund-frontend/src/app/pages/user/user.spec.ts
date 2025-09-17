import { TestBed } from '@angular/core/testing';

import { User } from '../../models/user.model';
import { UserService } from './userService';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
