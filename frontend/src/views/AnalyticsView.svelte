<script>
	import Chart from '../components/Chart.svelte';

	export let active;

	let theme = 'light';
</script>

<main hidden={!active}>
	<section class="analytics">
	<div class="notification is-info">
		<span class="icon is-medium">
			<ion-icon size="large" name="information-circle" role="img" class="md icon-large hydrated" aria-label="information circle"></ion-icon>
		</span>
		<span class="notif-message">Esta sección provee información sobre diferentes métricas de uso y rendimiento del chat en el tiempo, representadas como gráficos.</span>
	</div>
		<br />

		<center>
			<Chart id="98de19e7-41b0-4c03-b0d5-a8544e23563d" theme={theme} />
			<br />
			<Chart id="5be1e0cb-70c1-481f-9a7a-0b80d2477ef7" theme={theme} />
			<br />
			<Chart id="1ae95d7f-0f87-4fc9-9b33-0dfe2a7fa85a" thene={theme} />
			<br />
			<Chart id="350f22d4-ae63-4cf8-a222-d36df924ff0c" theme={theme} />
			<br />
		</center>
	</section>
</main>

<style>
	.notif-message {
	    position: relative;
	    bottom: 10px !important;
	    margin-left: 6px;
	}
</style>