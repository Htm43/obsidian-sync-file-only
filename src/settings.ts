import { App, PluginSettingTab, Setting } from "obsidian";
import SyncFileOnlyPlugin from "./main";

export interface SyncFileOnlySettings {
	enabled: boolean;
	autoRestoreLinks: boolean;
	savedPairs: string[];
}

export const DEFAULT_SETTINGS: SyncFileOnlySettings = {
	enabled: true,
	autoRestoreLinks: false,
	savedPairs: []
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
			.setDesc('Pair panes for synchronized file viewing')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enabled)
				.onChange(async (value) => {
					this.plugin.settings.enabled = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Auto-restore links on restart')
			.setDesc('Automatically restore pane links when Obsidian restarts (links are restored if the same files are open)')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoRestoreLinks)
				.onChange(async (value) => {
					this.plugin.settings.autoRestoreLinks = value;
					await this.plugin.saveSettings();
				}));
	}
}