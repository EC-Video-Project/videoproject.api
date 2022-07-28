import { assert } from "chai";
import { DisplayNameRegex, EmailRegex, PhoneRegex } from "src/utilities/regex";

describe("regex", function () {
  it("DisplayNameRegex should only allow characters, spaces, and single-quotes", function () {
    assert.isTrue(DisplayNameRegex.test("valid name"));
    assert.isTrue(DisplayNameRegex.test("Another Valid Name"));
    assert.isTrue(DisplayNameRegex.test("Ethan's Alt Account"));
    assert.isTrue(DisplayNameRegex.test("Numbers are 3Cool"));
    assert.isTrue(DisplayNameRegex.test("account_name"));

    assert.isFalse(DisplayNameRegex.test("unallowed character$"));
    assert.isFalse(DisplayNameRegex.test("*&#Y*YOuisofu"));
  });

  it("EmailRegex should only allow email addresses", function () {
    assert.isTrue(EmailRegex.test("someemail@example.com"));
    assert.isTrue(EmailRegex.test("numb3rs.stuff_things@asdf-com.com"));
    assert.isTrue(EmailRegex.test("rubber_ducky@3com.com"));
    assert.isTrue(EmailRegex.test("britishpeople@co.uk"));

    assert.isFalse(EmailRegex.test("not a valid email"));
    assert.isFalse(EmailRegex.test("fake@asdf"));
    assert.isFalse(EmailRegex.test("fake@2."));
    assert.isFalse(EmailRegex.test("#$#@%(*&@#%fake@asdf.com"));
  });

  it("PhoneRegex should only allow '+{digits}", function () {
    assert.isTrue(PhoneRegex.test("+15092342345"));
    assert.isTrue(PhoneRegex.test("+2533423423240"));

    assert.isFalse(PhoneRegex.test("2533423423240"));
    assert.isFalse(PhoneRegex.test("nope no phone for you"));
  });
});
