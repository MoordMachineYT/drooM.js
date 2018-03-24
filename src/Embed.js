class Embed {
  constructor() {
    this.fields = [];
    this.footer = {};
    this.author = {};
    this.image  = {};
    this.thumbnail = {};
    this.video = {};
  }
  addField(name, value) {
    if (this.fields.length >= 25) Promise.reject("you already have 25 fields");
    if (typeof name !== "string") Promise.reject("name must be a string");
    if (typeof value !== "string") Promise.reject("value must be a string");
    if (name.split("").length > 256) Promise.reject("name is too long, max 256 characters");
    if (value.split("").length > 1024) Promise.reject("value is too long, max 1024 characters");
    this.fields.push({ name: name, value: value, inline: false });
  }
  addInlineField(name, value) {
    if (this.fields.length >= 25) Promise.reject("you already have 25 fields");
    if (typeof name !== "string") Promise.reject("name must be a string");
    if (typeof value !== "string") Promise.reject("value must be a string");
    if (name.split("").length > 256) Promise.reject("name is too long, max 256 characters");
    if (value.split("").length > 1024) Promise.reject("value is too long, max 1024 characters");
    this.fields.push({ name: name, value: value, inline: true });
  }
  setColor(color) {
    this.color = color;
  }
  setTitle(title) {
    if (typeof title !== "string") Promise.reject("value must be a string");
    if (title.split("").length > 256) Promise.reject("title is too long, max 256 characters");
    this.title = title;
  }
  setFooter(prop, value) {
    if (typeof value !== "string") Promise.reject("value must be a string");
    if (prop === "text") {
      if (value.split("").length > 2048) Promise.reject("value is too long, max 2048 characters");
      this.footer.text = value;
    } else if (prop === "icon_url") {
      this.footer.icon_url = value;
    } else if (prop === "proxy_icon_url") {
      this.footer.proxy_icon_url = value;
    } else Promise.reject("invalid property type");
  }
  setDescription(value) {
    if (typeof value !== "string") Promise.reject("value must be a string");
    if (value.split("").length > 2048) Promise.reject("description is too long, max 2048 characters");
    this.description = value;
  }
  setAuthor(prop, value) {
    if (typeof value !== "string") Promise.reject("value must be a string");
    if (prop === "name") {
      if (value.split("").length > 256) Promise.reject("name is too long, max 256 characters");
      this.author.name = value;
    } else if (prop === "url") {
      this.author.url = value;
    } else if (prop === "icon_url") {
      this.author.icon_url = value;
    } else if (prop === "proxy_icon_url") {
      this.author.proxy_icon_url = value;
    } else Promise.reject("invalid property type");
  }
  setImage(prop, value) {
    if (prop === "url") {
      if (typeof value !== "string") Promise.reject("value must be a string");
      this.image.url = value;
    } else if (prop === "proxy_url") {
      if (typeof value !== "string") Promise.reject("value must be a string");
      this.image.proxy_url = value;
    } else if (prop === "height") {
      if (typeof value !== "number") Promise.reject("value must be an integer");
      if (!value.isInteger()) value = parseInt(value);
      this.image.height = value;
    } else if (prop === "width") {
      if (typeof value !== "number") Promise.reject("value must be an integer");
      if (!value.isInteger()) value = parseInt(value);
      this.image.width = value;
    } else Promise.reject("invalid property type");
  }
  setThumbnail(prop, value) {
    if (prop === "url") {
      if (typeof value !== "string") Promise.reject("value must be a string");
      this.thumbnail.url = value;
    } else if (prop === "proxy_url") {
      if (typeof value !== "string") Promise.reject("value must be a string");
      this.thumbnail.proxy_url = value;
    } else if (prop === "height") {
      if (typeof value !== "number") Promise.reject("value must be an integer");
      if (!value.isInteger()) value = parseInt(value);
      this.thumbnail.height = value;
    } else if (prop === "width") {
      if (typeof value !== "number") Promise.reject("value must be an integer");
      if (!value.isInteger()) value = parseInt(value);
      this.thumbnail.width = value;
    } else Promise.reject("invalid property type");
  }
  setVideo(prop, value) {
    if (prop === "url") {
      if (typeof value !== "string") Promise.reject("value must be a string");
      this.video.url = value;
    } else if (prop === "height") {
      if (typeof value !== "number") Promise.reject("value must be an integer");
      if (!value.isInteger()) value = parseInt(value);
      this.video.height = value;
    } else if (prop === "width") {
      if (typeof value !== "number") Promise.reject("value must be an integer");
      if (!value.isInteger()) value = parseInt(value);
      this.video.width = value;
    } else Promise.reject("invalid property type");
  }
  setProvider(name, value) {
    if (typeof name !== "string") Promise.reject("name must be a string");
    if (typeof value !== "string") Promise.reject("value must be a string");
    this.provider = {
      name: name,
      url: value
    };
  }
}

module.exports = Embed;
