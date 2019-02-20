const { InputStream } = require("./input_stream");

describe("InputStream", () => {
  let stream;
  beforeEach(() => {
    stream = new InputStream("hello world\nhello again");
  });

  describe("#next", () => {
    it("should return the next value in the stream and remove it", () => {
      expect(stream.next()).toBe("h");
      expect(stream.next()).toBe("e");
      expect(stream.next()).toBe("l");
      expect(stream.next()).toBe("l");
      expect(stream.next()).toBe("o");
      expect(stream.next()).toBe(" ");
      expect(stream.next()).toBe("w");
      expect(stream.next()).toBe("o");
      expect(stream.next()).toBe("r");
      expect(stream.next()).toBe("l");
      expect(stream.next()).toBe("d");
      expect(stream.next()).toBe("\n");
    });
  });

  describe("#peek", () => {
    it("should return the next value in the stream without removing it", () => {
      expect(stream.peek()).toBe("h");
      stream.position = 4;
      expect(stream.peek()).toBe("o");
    });
  });

  describe("#eof", () => {
    it("returns true iff there are no more values in the stream", () => {
      stream = new InputStream("a");
      expect(stream.eof()).toBe(false);
      stream.next();
      expect(stream.eof()).toBe(true);
    });
  });

  describe("#croak", () => {
    it("throws a new Error with the line and positionInLine attached", () => {
      expect(() => stream.croak("Fail")).toThrow(
        "Input stream error: Fail @ line 0, character 0"
      );
    });
  });
});
