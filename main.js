const DisinctiveEmotes = {
  MODULE_ID: "distinctive-emotes",
  DEFAULTS: {
    border: "#05cdff",
    text: "#ff6403",
  },
  getSetting: function (settingName) {
    return game.settings.get(DisinctiveEmotes.MODULE_ID, settingName);
  },
  localize: function (key) {
    return game.i18n.localize(DisinctiveEmotes.MODULE_ID + "." + key);
  },
  init: function () {
    console.log("Distinctive Emotes :: Initializing Options");
    game.settings.register(DisinctiveEmotes.MODULE_ID, "border-color", {
      name: DisinctiveEmotes.localize("border-color"),
      hint: DisinctiveEmotes.localize("border-color-hint"),
      scope: "client",
      config: true,
      default: DisinctiveEmotes.DEFAULTS.border,
      type: new foundry.data.fields.ColorField(),
    });
    game.settings.register(DisinctiveEmotes.MODULE_ID, "text-color", {
      name: DisinctiveEmotes.localize("text-color"),
      hint: DisinctiveEmotes.localize("text-color-hint"),
      scope: "client",
      config: true,
      default: DisinctiveEmotes.DEFAULTS.text,
      type: new foundry.data.fields.ColorField(),
    });
  },
  renderChatMessageHTML: function (message, html, context) {
    const element = html?.[0] ?? html;
    if (element.classList.contains("emote") === false) return;
    const borderColor = DisinctiveEmotes.getSetting("border-color").css;
    const textColor = DisinctiveEmotes.getSetting("text-color").css;
    element.classList.add("distinctive-emotes");
    const style =
      `--distinctive-emotes-border-color: ${borderColor};` +
      `--distinctive-emotes-text-color: ${textColor};`;
    element.setAttribute("style", style);
  },
};

Hooks.on("init", DisinctiveEmotes.init);
Hooks.on("renderChatMessageHTML", DisinctiveEmotes.renderChatMessageHTML);
