
import { expect } from 'chai';
import { Tag } from '../../../src/models/Tag';

describe('Tag', function() {
  const validAttrs = {
    id: undefined,
    type: 'skill',
    name: 'woodworking',
  };
  
  it('should require a name', function() {
    const invalidAttrs = Object.assign({}, validAttrs, { name: undefined });
    expect(() => Tag.new(invalidAttrs)).to.throw('tag name is required');
    
    expect(() => Tag.new(validAttrs)).not.to.throw('tag name is required');
  });
  
  it('should require a valid type', function() {
    const invalidTypes = [undefined, 'lcoation', 'some other type'];
    invalidTypes.forEach((invalidType) => {
      const invalidAttrs = Object.assign({}, validAttrs, { type: invalidType})
      expect(() => Tag.new(invalidAttrs), `${invalidType} should not be accepted`).to.throw('is not a valid tag type');
    });

    expect(() => Tag.new(validAttrs)).not.to.throw(`is not a valid tag type`);
  });
});