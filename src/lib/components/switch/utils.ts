const rangeC = [0, 0.1, 0.2, 0.5, 0.7, 1];
const rangeN = [0, 0.3, 0.5, 0.8, 0.9, 1];

const rectOutputs = {
	width: [16, 16, 19, 22, 19, 16],
	height: [16, 10, 19, 10, 19, 16],
	rx: [8, 5, 9.5, 5, 9.5, 8],
	x: [4, 4, 2.5, 1, 2.5, 4],
	y: [4, 7, 2.5, 7, 2.5, 4],
};

export function interpolate(value: number, range: number[], output: number[]): number {
	if (range.length === 0) return 0;
	if (range.length === 1) return output[0];
	if (value <= range[0]) return output[0];
	if (value >= range[range.length - 1]) return output[output.length - 1];

	for (let i = 0; i < range.length - 1; i++) {
		const t0 = range[i];
		const t1 = range[i + 1];
		if (value >= t0 && value <= t1) {
			const v0 = output[i];
			const v1 = output[i + 1];
			if (t1 === t0) return v0;
			const ratio = (value - t0) / (t1 - t0);
			return v0 + ratio * (v1 - v0);
		}
	}
	return output[output.length - 1];
}

export function getRectProp(
	prop: keyof typeof rectOutputs,
	eaVal: number,
	turnOn: boolean,
	reduced: boolean,
) {
	if (reduced) {
		if (prop === 'rx') return 8;
		if (prop === 'x' || prop === 'y') return 4;
		return 16;
	}
	const outputs = rectOutputs[prop];
	if (turnOn) {
		return interpolate(eaVal, rangeC, outputs);
	} else {
		const reversed = [...outputs].reverse();
		return interpolate(eaVal, rangeN, reversed);
	}
}

export function getPath1(tVal: number): string {
	if (tVal <= 0.5) {
		const u = tVal / 0.5;
		const y1 = 6 + u * 6;
		const y2 = 18 - u * 6;
		return `M 6 ${y1} L 18 ${y2}`;
	} else {
		const u = (tVal - 0.5) / 0.5;
		const x2 = 18 - u * 7;
		const y2 = 12 + u * 5;
		return `M 6 12 L ${x2} ${y2}`;
	}
}

export function getPath2(tVal: number): string {
	if (tVal <= 0.5) {
		const u = tVal / 0.5;
		const y1 = 18 - u * 6;
		const y2 = 6 + u * 6;
		return `M 6 ${y1} L 18 ${y2}`;
	} else {
		const u = (tVal - 0.5) / 0.5;
		const x1 = 6 + u * 5;
		const y1 = 12 + u * 5;
		const y2 = 12 - u * 5;
		return `M ${x1} ${y1} L 18 ${y2}`;
	}
}
