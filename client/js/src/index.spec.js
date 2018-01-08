
describe("Index spec", function() {
    beforeEach(function() {
        var fixture = '<div id="fixture">' +
          '<div id="container"><br /><br /><br /><br /><br />Loading...</div>' +
          '</div>';

        document.body.appendChild(fixture);
      });

      // remove the html fixture from the DOM
      afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
      });
    it("is just a function, so it can contain any code", function() {
        var foo = 0;
        foo += 1;
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function () {
        var foo = 0;
        foo += 1;

        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});
