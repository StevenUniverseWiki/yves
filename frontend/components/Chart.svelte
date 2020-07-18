<script>
	export let id, theme;
</script>

<main>
	<div class="chart chart-messages-last-30-days">
		<iframe src="https://charts.mongodb.com/charts-suwchatbot-dsvyf/embed/charts?id={id}&theme={theme}" loading="lazy"></iframe>
	</div>
</main>

<style>
iframe {
	width: 100%;
	height: 480px;
	background: #fff;
	border: none;
	border-radius: 2px;
	box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);
}
</style>