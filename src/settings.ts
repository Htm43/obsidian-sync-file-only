import { App, PluginSettingTab, Setting } from "obsidian";
import SyncFileOnlyPlugin from "./main";

export interface SyncFileOnlySettings {
	enabled: boolean;
}

export const DEFAULT_SETTINGS: SyncFileOnlySettings = {
	enabled: true
}

export class SyncSettingTab extends PluginSettingTab {
	plugin: SyncFileOnlyPlugin;

	constructor(app: App, plugin: SyncFileOnlyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Enable file sync')
			.setDesc('Enable 1:1 pane pairing for file sync. Use "Link this pane for file sync" on each pane you want to pair.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enabled)
				.onChange(async (value) => {
					this.plugin.settings.enabled = value;
					await this.plugin.saveSettings();
				}));
	}
}
