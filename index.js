'use strict';

module.exports = () => {
	return new Promise(resolve => {
		const wasAlreadyRaw = process.stdin.isRaw;

		if (!wasAlreadyRaw) {
			process.stdin.setRawMode(true);
			process.stdin.resume();
		}

		const onData = data => {
			if (data.toString() === '\r') {
				if (!wasAlreadyRaw) {
					process.stdin.setRawMode(false);
					process.stdin.pause();
				}

				process.stdin.removeListener('data', onData);
				resolve();
			}
		};

		process.stdin.on('data', onData);
	});
};
