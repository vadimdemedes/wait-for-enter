import execa from 'execa';
import test from 'ava';

test('exit on enter', t => {
	t.notThrows(() => {
		execa.sync('node', ['fixture'], {
			stdin: '\r'
		});
	});
});
