const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    typeof: "string",
    require: [true, "role is required"],
  },
});

module.exports = model("Role", RoleSchema);
