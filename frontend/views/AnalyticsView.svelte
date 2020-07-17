<script>
	import Chart from '../components/Chart.svelte';

	let theme = 'light';
</script>

<main>
	<section class="analytics">
		<p>Esta sección provee información sobre diferentes métricas de uso y rendimiento del chat en el tiempo, representadas como gráficos.</p>
		<br />

		<center>
			<Chart id="98de19e7-41b0-4c03-b0d5-a8544e23563d" theme={theme} />
			<br />
			<Chart id="5be1e0cb-70c1-481f-9a7a-0b80d2477ef7" theme={theme} />
			<br />
			<Chart id="1ae95d7f-0f87-4fc9-9b33-0dfe2a7fa85a" thene={theme} />
		</center>
	</section>
</main>