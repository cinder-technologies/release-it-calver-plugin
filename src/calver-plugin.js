import { UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import { Plugin } from "release-it";

const DEFAULT_FORMAT = "yyyy.MM.dd";

function getCurrentDate(dateFormat) {
	const date = new UTCDate();
	return format(date, dateFormat || DEFAULT_FORMAT);
}

class CalverPlugin extends Plugin {
	getIncrementedVersion(args) {
		const { latestVersion } = args || {};
		if (latestVersion) {
			const [prevDate, prevSuffix] = latestVersion.split("-");
			let newSuffix = prevSuffix ? Number.parseInt(prevSuffix, 10) : 1;
			const newVersion = getCurrentDate(this.getContext().format);

			if (newVersion === prevDate) {
				newSuffix++;
			}

			return newSuffix > 1 ? `${newVersion}-${newSuffix}` : newVersion;
		}

		return getCurrentDate(this.getContext().format);
	}

	getIncrementedVersionCI(args) {
		return this.getIncrementedVersion(args);
	}

	getIncrement(args) {
		return this.getIncrementedVersion(args);
	}
}

export default CalverPlugin;
