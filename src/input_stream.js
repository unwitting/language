class InputStream {
  constructor(string) {
    this.string = string;
    this.position = 0;
    this.line = 1;
    this.positionInLine = 0;
  }

  peek() {
    return this.string.charAt(this.position);
  }

  next() {
    const char = this.peek();
    this.position = this.position + 1;
    if (char === "\n") {
      this.line = this.line + 1;
      this.positionInLine = 0;
    } else {
      this.positionInLine = this.positionInLine + 1;
    }
    return char;
  }

  eof() {
    return this.position === this.string.length;
  }

  croak(msg) {
    throw new Error(
      `Input stream error: ${msg} @ line ${this.line}, character ${
        this.positionInLine
      }`
    );
  }
}

module.exports = { InputStream };
