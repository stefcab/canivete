import timeSince from "../dist/timeSince";

describe("timeSince", function() {
	it(`"Should return the time passed since a timestamp, in milliseconds.`, function(done) {
		let timestamp = +new Date(),
			result = 0;

		setTimeout(() => {
			result = timeSince(timestamp);
			expect(result < 110 && result >= 100).toBe(true);
			done();
		}, 100);
	});
});