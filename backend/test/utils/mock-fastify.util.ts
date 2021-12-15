export function createRepMock(mimetype?: string, buffer?: Buffer): any {
  return {
    type: function (data: string) {
      expect(data).toEqual(mimetype);
      return this;
    },
    send: function (data: Buffer) {
      expect(data).toEqual(buffer);
      return this;
    },
  };
}
