require('./game.js');
describe("The test environment", function() {
  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});