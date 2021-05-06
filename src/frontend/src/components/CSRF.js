export function getCookie(name) {
	if (!document.cookie) {
		return null;
	}

	const xsrfCookies = document.cookie.split(';')
		.map(c => c.trim())
		.filter(c => c.startsWith(name + '='));

	if (xsrfCookies.length === 0) {
		return null;
	}
	console.log(decodeURIComponent(xsrfCookies[0].split('=')[1]))
	return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}