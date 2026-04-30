<script lang="ts">
	import { onMount } from 'svelte';
	import type { SignatureFieldSpec } from './types';

	type Point = { x: number; y: number };
	type Stroke = Point[];

	let {
		data,
		userValue = '',
		error = '',
		onchange
	}: {
		data: SignatureFieldSpec;
		userValue?: string | Stroke[];
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	let canvas: HTMLCanvasElement;
	let value = $state(typeof userValue === 'string' ? userValue : JSON.stringify(userValue || []));
	let strokes: Stroke[] = [];
	let currentStroke: Stroke | null = null;

	function parseValue(raw: string): Stroke[] {
		if (!raw) return [];

		try {
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) return [];

			if (parsed.every((stroke) => Array.isArray(stroke))) return parsed as Stroke[];

			return parsed
				.filter((point) => typeof point?.lx === 'number' && typeof point?.ly === 'number')
				.map((point) => [
					{ x: point.mx ?? point.lx, y: point.my ?? point.ly },
					{ x: point.lx, y: point.ly }
				]);
		} catch {
			return [];
		}
	}

	function serialize(nextStrokes: Stroke[]): string {
		return JSON.stringify(nextStrokes);
	}

	function context() {
		const ctx = canvas.getContext('2d');
		if (!ctx) return null;

		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.strokeStyle = '#e2e8f0';
		return ctx;
	}

	function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
		if (!stroke.length) return;

		ctx.beginPath();
		ctx.moveTo(stroke[0].x, stroke[0].y);
		for (const point of stroke.slice(1)) {
			ctx.lineTo(point.x, point.y);
		}
		ctx.stroke();
	}

	function redraw() {
		const ctx = context();
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const stroke of strokes) drawStroke(ctx, stroke);
	}

	function pointFromEvent(e: PointerEvent): Point {
		const rect = canvas.getBoundingClientRect();
		return {
			x: ((e.clientX - rect.left) / rect.width) * canvas.width,
			y: ((e.clientY - rect.top) / rect.height) * canvas.height
		};
	}

	function emitChange() {
		value = serialize(strokes);
		onchange(value);
	}

	function handlePointerDown(e: PointerEvent) {
		canvas.setPointerCapture(e.pointerId);
		currentStroke = [pointFromEvent(e)];
		strokes = [...strokes, currentStroke];
		redraw();
	}

	function handlePointerMove(e: PointerEvent) {
		if (!currentStroke) return;

		currentStroke.push(pointFromEvent(e));
		redraw();
	}

	function handlePointerUp(e: PointerEvent) {
		if (!currentStroke) return;

		currentStroke.push(pointFromEvent(e));
		currentStroke = null;
		redraw();
		emitChange();
	}

	function clearSignature() {
		strokes = [];
		currentStroke = null;
		redraw();
		emitChange();
	}

	onMount(() => {
		strokes = parseValue(value);
		redraw();
	});
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<div class="signature-pad">
		<canvas
			bind:this={canvas}
			class="signature-canvas"
			width="198"
			height="55"
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerUp}
		></canvas>
	</div>
	<input type="hidden" name="field{data.id}" {value} />
	<button type="button" class="clear-signature" onclick={clearSignature}>clear signature</button>
</div>

<style>
	.field-instance {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}
	.error-message {
		color: #f87171;
		font-size: 0.8rem;
		margin: 0;
		padding: 0.25rem 0.5rem;
		background: rgba(248, 113, 113, 0.1);
		border-radius: 0.25rem;
	}
	.signature-pad {
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		padding: 0.5rem;
	}
	.signature-canvas {
		display: block;
		width: 198px;
		height: 55px;
		touch-action: none;
		cursor: crosshair;
	}
	.clear-signature {
		border: 0;
		background: transparent;
		color: var(--color-accent, #6366f1);
		cursor: pointer;
		font-size: 0.8rem;
		padding: 0;
	}
</style>
