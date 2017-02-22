class Theme {
	constructor(language) {
		this.language = language;
		this.subscriptions = []
	}

	setLanguage(language) {
		this.language = language;
		this.subscriptions.forEach(f => f())
	}

	subscribe(f) {
		this.subscriptions.push(f)
	}
}

export default Theme;
