const Applet = imports.ui.applet;
const Lang = imports.lang;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Settings = imports.ui.settings;

class YourProjectApplet extends Applet.TextIconApplet {
    static MAX_UPDATES = 5;

    constructor(metadata, orientation, panel_height, instance_id) {
        super(orientation, panel_height, instance_id);

        // set an applet running state
        this._applet_running = true;

        try {
            // read settings and bind update-interval to a property and a callback on change
            this.settings = new Settings.AppletSettings(this, metadata.uuid, instance_id);
            this.settings.bind("update-interval", "_update_interval", this.on_settings_changed)

            // business logic
            this._counter = 0;

            // call a function that manages the mainloop and a repetition timeout
            this._set_update_interval();
        } catch (e) {
            // log the fail reason
            global.logError("your-project@username: init failed with " + e.message)
            // stop the applet to prevent any possible unwanted updates
            this._applet_running = false;
        }
    }

    _set_update_interval() {
        // if timeout already exists clear it
        if (this._timeout_id > 0) {
            this._clear_timeout();
        }

        const update_interval = parseInt(this._update_interval);
        // read min and max update interval value from settings
        const min_update_interval = this.settings.settingsData['update-interval'].min;
        const max_update_interval = this.settings.settingsData['update-interval'].max;
        // if settings are invalid, stop the applet
        if (
            isNaN(update_interval) ||
            // this exact check is excessive but I leave it as a good example of using settingsData
            (update_interval < min_update_interval && update_interval > max_update_interval)
        ) {
            this._applet_running = false;
            return;
        }

        // the mainloop sets a repetition timeout and Lang.bind binds this to a callback function
        this._timeout_id = Mainloop.timeout_add(this._update_interval, Lang.bind(this, this._increment_count))
    }

    _clear_timeout() {
        Mainloop.source_remove(this._timeout_id);
        this._timeout_id = 0;
    }

    on_applet_clicked() {
        // restart the applet
        this._applet_running = true;
        this._counter = 0;

        this._set_update_interval();
    }

    on_settings_changed() {
        // restart the applet
        this._applet_running = true;
        this._counter = 0;

        this._set_update_interval();
    }

    on_applet_removed_from_panel() {
        // removes all bindings
        this.settings.finalize();
        // this is important to clear any timeouts when applet is removed
        if (this._timeout_id > 0) {
            this._clear_timeout();
        }
    }

    _increment_count() {
        // if applet is running, continue with the applet's logic
        if (this._applet_running) {
            // if counter exceeds max, stop the applet (the timer will be reset on the next loop)
            if (this._counter >= YourProjectApplet.MAX_UPDATES) {
                this._applet_running = false;
            }

            // business logic
            this.set_applet_label(`updated ${this._counter} times`);
            this._counter < YourProjectApplet.MAX_UPDATES && this._counter++;

            // if returns true, the mainloop continues with the current timeout
            return true;
        }

        // if the logic has stopped, than stop gracefully
        this.set_applet_label(`executed ${this._counter} times`);
        // this is important to reset the timeout id
        this._timeout_id = 0;
        // if returns false, the timeout is automatically destroyed (but not reset)
        return false;
    }
}

function main(metadata, orientation, panel_height, instance_id) {
    return new YourProjectApplet(metadata, orientation, panel_height, instance_id);
}
