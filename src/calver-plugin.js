import { UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import { Plugin } from "release-it";

const DEFAULT_FORMAT = "yyyy.M.d";

const VERSION_REGEX = /^(\d{4})\.(\d{1,2})\.(\d{1,2})\.(\d+)(?:-.*)?$/;

class CalverPlugin extends Plugin {
	getIncrementedVersion(args) {
		const { latestVersion } = args || {};
		let prevYear;
		let prevMonth;
		let prevDay;
		let prevSuffix;
		let _;
		if (latestVersion) {
			const match = latestVersion.match(VERSION_REGEX);
			if (!match) {
				throw new Error(`Invalid previous version: ${latestVersion}`);
			}

			[_, prevYear, prevMonth, prevDay, prevSuffix] = match;
			prevYear = Number.parseInt(prevYear, 10);
			prevMonth = Number.parseInt(prevMonth, 10);
			prevDay = Number.parseInt(prevDay, 10);
			prevSuffix = Number.parseInt(prevSuffix, 10);
		}

		const newDate = new UTCDate();
		const newYear = newDate.getFullYear();
		const newMonth = newDate.getMonth() + 1;
		const newDay = newDate.getDate();

		let newSuffix = 1;
		if (prevYear === newYear && prevMonth === newMonth && prevDay === newDay) {
			newSuffix = prevSuffix + 1;
		}

		const dateFormat = this.getContext().format || DEFAULT_FORMAT;

		return `${format(newDate, dateFormat)}.${newSuffix}`;
	}

	getIncrementedVersionCI(args) {
		return this.getIncrementedVersion(args);
	}

	getIncrement(args) {
		return this.getIncrementedVersion(args);
	}
}

export default CalverPlugin;
