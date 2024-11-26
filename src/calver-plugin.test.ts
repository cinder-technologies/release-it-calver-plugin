import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CalverPlugin from "./calver-plugin";

describe("plugin", () => {
	beforeEach(() => {
		// tell vitest we use mocked time
		vi.useFakeTimers();
	});

	afterEach(() => {
		// restoring date after each test run
		vi.useRealTimers();
	});

	it("bumps the date", () => {
		const mockDate = new Date(2024, 0, 2);
		vi.setSystemTime(mockDate);
		const newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: "2024.1.1.1",
		});
		expect(newVersion).toEqual("2024.1.2.1");
	});

	it("bumps the month", () => {
		const mockDate = new Date(2024, 1, 1);
		vi.setSystemTime(mockDate);
		const newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: "2024.1.1.1",
		});
		expect(newVersion).toEqual("2024.2.1.1");
	});

	it("bumps the year", () => {
		const mockDate = new Date(2025, 0, 1);
		vi.setSystemTime(mockDate);
		const newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: "2024.1.1.1",
		});
		expect(newVersion).toEqual("2025.1.1.1");
	});

	it("handles no inputs", () => {
		const mockDate = new Date(2025, 0, 1);
		vi.setSystemTime(mockDate);

		let newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: null,
		});
		expect(newVersion).toEqual("2025.1.1.1");

		newVersion = new CalverPlugin().getIncrementedVersion({});
		expect(newVersion).toEqual("2025.1.1.1");

		newVersion = new CalverPlugin().getIncrementedVersion();
		expect(newVersion).toEqual("2025.1.1.1");
	});

	it("handles multiple releases on the same day", () => {
		const mockDate = new Date(2024, 0, 1);
		vi.setSystemTime(mockDate);

		let newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: "2024.1.1.1",
		});
		expect(newVersion).toEqual("2024.1.1.2");

		newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: "2024.1.1.2",
		});
		expect(newVersion).toEqual("2024.1.1.3");
	});

	it("allows versions with a suffix", () => {
		const mockDate = new Date(2024, 0, 1);
		vi.setSystemTime(mockDate);

		let newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: "2024.1.1.1-alpha",
		});
		expect(newVersion).toEqual("2024.1.1.2");

		newVersion = new CalverPlugin().getIncrementedVersion({
			latestVersion: "2024.1.1.1-alpha.g123457-foobar",
		});
		expect(newVersion).toEqual("2024.1.1.2");
	});
});
