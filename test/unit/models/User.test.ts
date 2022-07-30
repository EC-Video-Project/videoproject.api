// @ts-nocheck
import { expect } from 'chai';
import { User, ProfileLink } from '../../../src/models/User';
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
      const invalidAttrs = Object.assign({}, validAttrs, { id: invalidId });
      expect(() => User.new(invalidAttrs), `${invalidId} should not be accepted`).to.throw('is not a valid user id -- must be a uuid');
    });

    expect(() => User.new(validAttrs), `${validAttrs.id} should be accepted`).not.to.throw('is not a valid user id -- must be a uuid');
  });

  it('should require a cognitoUsername', function() {
    const invalidAttrs = Object.assign({}, validAttrs, { cognitoUsername: undefined });
    expect(() => User.new(invalidAttrs)).to.throw('cognitoUsername is required');

    expect(() => User.new(validAttrs)).not.to.throw('cognitoUsername is required');
  });

  it('should require a valid display name', function() {
    const invalidDisplayNames = ['', 'no$ymbols'];
    invalidDisplayNames.forEach((invalidDisplayName) => {
      const invalidAttrs = Object.assign({}, validAttrs, { displayName: invalidDisplayName });
      expect(() => User.new(invalidAttrs), `${invalidDisplayName} should not be accepted`).to.throw('is not a valid display name');
    });
    
    const validDisplayNames = ['Spaces Are Fine', 'num5Ar3F1ne'];
    validDisplayNames.forEach((validDisplayName) => {
      const validDisplayNameAttrs = Object.assign({}, validAttrs, { displayName: validDisplayName });
      expect(() => User.new(validDisplayNameAttrs), `${validDisplayName} should be accepted`).not.to.throw('is not a valid display name');
      expect(User.new(validDisplayNameAttrs).displayName).to.equal(validDisplayName);
    });
  });

  it('should require a valid email', function() {
    const invalidEmails = ['sldjweokhsld', 'testestes@somethingcom', '@ex.com'];
    invalidEmails.forEach((invalidEmail) => {
      const invalidAttrs = Object.assign({}, validAttrs, { email: invalidEmail });
      expect(() => User.new(invalidAttrs), `${invalidEmail} should not be accepted`).to.throw('is not a valid email');
    });
    
    const validEmails = ['testemail123.4@this.net', '987236@funny.co'];
    validEmails.forEach((validEmail) => {
      const validEmailAttrs = Object.assign({}, validAttrs, { email: validEmail });
      expect(() => User.new(validEmailAttrs), `${validEmail} should be accepted`).not.to.throw('is not a valid email');
      expect(User.new(validEmailAttrs).email).to.equal(validEmail);
    });
  });

  it('should require a valid phone number', function() {
    const invalidPhoneNos = ['17703318612', '12345', '8201067861736'];
    invalidPhoneNos.forEach((invalidPhone) => {
      const invalidAttrs = Object.assign({}, validAttrs, { phone: invalidPhone });
      expect(() => User.new(invalidAttrs), `${invalidPhone} should not be accepted`).to.throw('is not a valid phone');
    });
    
    const validPhoneNos = ['+8201067861736', '+11234567890'];
    validPhoneNos.forEach((validPhone) => {
      const validPhoneAttrs = Object.assign({}, validAttrs, { phone: validPhone });
      expect(() => User.new(validPhoneAttrs), `${validPhone} should be accepted`).not.to.throw('is not a valid phone');
      expect(User.new(validPhoneAttrs).phone).to.equal(validPhone);
    });
  });

  it('should require an employerMode', function() {
    const invalidPhoneNos = ['true', 0, undefined];
    invalidPhoneNos.forEach((invalidEM) => {
      const invalidAttrs = Object.assign({}, validAttrs, { employerMode: invalidEM });
      expect(() => User.new(invalidAttrs), `${invalidEM} should not be accepted`).to.throw('is not a valid employer mode');
    });

    expect(() => User.new(validAttrs)).not.to.throw('employer mode is required');
    expect(User.new(validAttrs).employerMode).to.equal(validAttrs.employerMode);
  });

  describe('should require valid profile links', function() {
    const validPL = {type: 'Twitter', url: 'twitter.com/me'};
    const validPLAttrs = Object.assign({}, validAttrs, { profileLinks: [validPL]});

    it('should require a type', function() {
      const invalidTypeAttrs = Object.assign({}, validAttrs, { profileLinks: [{ url: 'www.example.com/me'}] });
      expect(() => User.new(invalidTypeAttrs)).to.throw('type required on profile link');

      expect(() => User.new(validPLAttrs)).not.to.throw('type required on profile link');
      expect(User.new(validPLAttrs).profileLinks).to.equal(validPLAttrs.profileLinks);
    });
  
    it('should require a url', function() {
      const invalidValueAttrs = Object.assign({}, validAttrs, { profileLinks: [{type: 'Personal Website'}] });
      expect(() => User.new(invalidValueAttrs)).to.throw('url required on profile link');

      expect(() => User.new(validPLAttrs)).not.to.throw('url required on profile link');
      expect(User.new(validPLAttrs).profileLinks).to.equal(validPLAttrs.profileLinks);
    });
  });
});


