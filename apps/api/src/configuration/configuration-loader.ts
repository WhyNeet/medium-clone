import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";
import { LOCATION } from "./constants";

export type Configuration = Record<string, unknown>;

export class ConfigurationLoader {
	public static dev(fileName: string): () => Configuration {
		return () => ConfigurationLoader.load(fileName, true);
	}

	private static load(fileName: string, devOnly?: boolean): Configuration {
		if (process.env.NODE_ENV === "production" && devOnly) return {};

		return ConfigurationLoader.loadYaml(fileName);
	}

	private static loadYaml(fileName: string): Configuration {
		const filePath = path.join(LOCATION, fileName);
		const content = fs.readFileSync(filePath, { encoding: "utf-8" });

		return yaml.load(content) as Record<string, unknown>;
	}
}
