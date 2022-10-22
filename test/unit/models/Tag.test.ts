import { expect } from 'chai';
import { Tag } from '../../../src/models/Tag';

describe('Tag', function() {
  const validAttrs = {
    id: -1,
    type: 'skill',
    name: 'woodworking',
  };

  it('should require a valid id', function() {
    const invalidIds = [undefined, '4', 'slj3lixo8esyh3ree3'];
    invalidIds.forEach((invalidId) => {
      const invalidAttrs = { ...validAttrs, id: invalidId as any};
      const failMsg = `${invalidId} should not be accepted`;
      expect(() => Tag.new(invalidAttrs), failMsg).to.throw('is not a valid tag id');
    });

    expect(() => Tag.new(validAttrs)).not.to.throw(`is not a valid tag id`);
    expect(Tag.new(validAttrs).id).to.equal(validAttrs.id);
  });

  it('should require a name', function() {
    const invalidAttrs = { ...validAttrs };
    delete invalidAttrs.name;
    expect(() => Tag.new(invalidAttrs)).to.throw('tag name is required');

    expect(() => Tag.new(validAttrs)).not.to.throw('tag name is required');
    expect(Tag.new(validAttrs).name).to.equal(validAttrs.name);
  });

  it('should require a valid type', function() {
    const invalidTypes = [undefined, 'lcoation', 'some other type'];
    invalidTypes.forEach((invalidType) => {
      const invalidAttrs = { ...validAttrs, type: invalidType};
      const failMsg = `${invalidType} should not be accepted`;
      expect(() => Tag.new(invalidAttrs), failMsg).to.throw('is not a valid tag type');
    });

    expect(() => Tag.new(validAttrs)).not.to.throw(`is not a valid tag type`);
    expect(Tag.new(validAttrs).type).to.equal(validAttrs.type);
  });
}); 