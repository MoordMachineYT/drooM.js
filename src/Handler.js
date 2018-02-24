class Handler {
  constructor(cl) {
    this._client = cl;
    this.handling = [];
  }
  onMessageCreate(func) {
    this._client.on("messageCreate", func);
  }
  handle(ev, func) {
    if (~this.handling.indexOf(ev)) throw new Error("already handling event '" + ev + "'");
    this._client.on(ev, func);
    this.handling.push(ev);
  }
}
