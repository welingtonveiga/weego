cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-app-preferences.apppreferences",
        "file": "plugins/cordova-plugin-app-preferences/www/apppreferences.js",
        "pluginId": "cordova-plugin-app-preferences",
        "clobbers": [
            "plugins.appPreferences"
        ]
    },
    {
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-app-preferences": "0.99.3",
    "cordova-sqlite-storage": "2.0.2"
};
// BOTTOM OF METADATA
});