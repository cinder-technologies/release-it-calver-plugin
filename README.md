# release-it-calver-plugin

![NPM Version](https://img.shields.io/npm/v/%40cinderco%2Frelease-it-calver-plugin)

This is a plugin for [release-it](https://github.com/release-it/release-it/) that lets you use [CalVer](https://calver.org/).

It's an opinionated plugin. When you create a release with release-it, the plugin will:
- Get the current date (in the UTC timezone)
- Make the new version the current date + a daily realease number, e.g. `2025.1.1.1`
- If there was already another release on the same day, then it will increment the daily release number, e.g. `2025.1.1.2`.

This versioning scheme is well-suited for SaaS software where it doesn't make sense to talk about a breaking change for the entire app.

The plugin will also allow release suffixes after a `-`, for example `2025.1.1.2-g1234567`. This suffix is ignored when calculating the next version.

## Usage

Install the plugin:

```bash
npm install -D @cinderco/release-it-calver-plugin
```

Then, add it to your `.release-it.json`:

```json
{
  "$schema": "https://unpkg.com/release-it/schema/release-it.json",
  "plugins": {
    "@cinderco/release-it-calver-plugin": {
      "format": "yyyy.M.d"
    }
  }
}
```

`format` can be any date formatting string that is compatible with [date-fns](https://date-fns.org/v4.1.0/docs/format).