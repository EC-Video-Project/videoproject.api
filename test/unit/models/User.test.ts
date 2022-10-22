import { expect } from 'chai';
import { User } from '../../../src/models/User';
import { v4 as uuidv4 } from "uuid";

describe('User', function() {
  const validAttrs = {
    id: uuidv4(),
    cognitoUsername: 'oiseoksher0w9we',
    displayName: 'charchar',
    email: 'valid@example.com',
    phone: '+17703318612',
    employerMode: false,
    bio: 'hi here are some words!',
    profileLinks: []
  };

  it('should require that its id be a uuid', function(){
    const invalidIds = ['owiehsokjdf', 9287398273, 'lkjsd98c%x2l!kws', 5, undefined];
    invalidIds.forEach((invalidId) => {
      const invalidAttrs = { ...validAttrs, id: invalidId as any };
      const failMsg = `${invalidId} should not be accepted`;
      expect(() => User.new(invalidAttrs), failMsg).to.throw(`${invalidId} is not a valid user id -- must be a uuid`);
    });

    expect(() => User.new(validAttrs)).not.to.throw(`user id`);
  });

  it('should require a cognitoUsername', function() {
    const invalidAttrs = { ...validAttrs };
    delete invalidAttrs.cognitoUsername;
    expect(() => User.new(invalidAttrs)).to.throw('cognitoUsername is required');

    expect(() => User.new(validAttrs)).not.to.throw('cognitoUsername is required');
  });

  it('should require a valid display name', function() {
    const invalidDisplayNames = ['', 'no$ymbols'];
    invalidDisplayNames.forEach((invalidDisplayName) => {
      const invalidAttrs = { ...validAttrs, displayName: invalidDisplayName };
      const failMsg = `${invalidDisplayName} should not be accepted`;
      expect(() => User.new(invalidAttrs), failMsg).to.throw(`${invalidDisplayName} is not a valid display name`);
    });

    const validDisplayNames = ['Spaces Are Fine', 'num5Ar3F1ne'];
    validDisplayNames.forEach((validDisplayName) => {
      const validDisplayNameAttrs = { ...validAttrs, displayName: validDisplayName };
      expect(() => User.new(validDisplayNameAttrs)).not.to.throw('display name');
      expect(User.new(validDisplayNameAttrs).displayName).to.equal(validDisplayName);
    });
  });

  it('should require a valid email', function() {
    const invalidEmails = ['sldjweokhsld', 'testestes@somethingcom', '@ex.com'];
    invalidEmails.forEach((invalidEmail) => {
      const invalidAttrs = { ...validAttrs, email: invalidEmail };
      const failMsg = `${invalidEmail} should not be accepted`;
      expect(() => User.new(invalidAttrs), failMsg).to.throw(`${invalidEmail} is not a valid email`);
    });

    const validEmails = ['testemail123.4@this.net', '987236@funny.co'];
    validEmails.forEach((validEmail) => {
      const validEmailAttrs = { ...validAttrs, email: validEmail };
      expect(() => User.new(validEmailAttrs)).not.to.throw('email');
      expect(User.new(validEmailAttrs).email).to.equal(validEmail);
    });
  });

  it('should require a valid phone number', function() {
    const invalidPhoneNos = ['17703318612', '12345', '8201067861736'];
    invalidPhoneNos.forEach((invalidPhone) => {
      const invalidAttrs = { ...validAttrs, phone: invalidPhone };
      const failMsg = `${invalidPhone} should not be accepted`;
      expect(() => User.new(invalidAttrs), failMsg).to.throw(`${invalidPhone} is not a valid phone`);
    });

    const validPhoneNos = ['+8201067861736', '+11234567890'];
    validPhoneNos.forEach((validPhone) => {
      const validPhoneAttrs = { ...validAttrs, phone: validPhone };
      expect(() => User.new(validPhoneAttrs)).not.to.throw('phone');
      expect(User.new(validPhoneAttrs).phone).to.equal(validPhone);
    });
  });

  it('should require a valid employerMode', function() {
    const invalidPhoneNos = ['true', 0, undefined];
    invalidPhoneNos.forEach((invalidEM) => {
      const invalidAttrs = { ...validAttrs, employerMode: invalidEM as any };
      const failMsg = `${invalidEM} should not be accepted`;
      expect(() => User.new(invalidAttrs), failMsg).to.throw(`${invalidEM} is not a valid employer mode`);
    });

    expect(() => User.new(validAttrs)).not.to.throw('employer mode');
    expect(User.new(validAttrs).employerMode).to.equal(validAttrs.employerMode);
  });

  describe('should require valid profile links', function() {
    const validPL = {type: 'Twitter', url: 'twitter.com/me'};
    const validPLAttrs = { ...validAttrs, profileLinks: [validPL] };

    it('should require a type', function() {
      const invalidTypeAttrs = { ...validAttrs, profileLinks: [{ url: 'www.example.com/me'}] as any };
      expect(() => User.new(invalidTypeAttrs)).to.throw('type required on profile link');

      expect(() => User.new(validPLAttrs)).not.to.throw('type required on profile link');
      expect(User.new(validPLAttrs).profileLinks).to.equal(validPLAttrs.profileLinks);
    });

    it('should require a url', function() {
      const invalidValueAttrs = { ...validAttrs, profileLinks: [{type: 'Personal Website'}] as any };
      expect(() => User.new(invalidValueAttrs)).to.throw('url required on profile link');

      expect(() => User.new(validPLAttrs)).not.to.throw('url required on profile link');
      expect(User.new(validPLAttrs).profileLinks).to.equal(validPLAttrs.profileLinks);
    });
  });
});