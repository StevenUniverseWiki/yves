<script>
	import ChatMessage from '../components/ChatMessage.svelte';
	import SystemMessage from '../components/SystemMessage.svelte';
	import CompactMessage from '../components/CompactMessage.svelte';

	export let client, active;

	let uiState = {
		// display options
		compactMode: false
	}

	let entries = [];

	messageService.on('created', (message) => {
		console.log('Message created:', message);
		entries = [...entries, message];
	});
</script>

<main hidden={!active}>
	<section class="liveChat">
		<div class="notification is-info">
			<span class="icon is-medium">
				<ion-icon size="large" name="information-circle" role="img" class="md icon-large hydrated" aria-label="information circle"></ion-icon>
			</span>
			<span class="notif-message">Los nuevos eventos de chat aparecerán en tiempo real en esta página.</span>
		</div>
		<hr>
		<div class="interface-options">
			<label class="label">
			<input class="checkbox" type="checkbox" bind:checked={uiState.compactMode}>
			Modo compacto (útil al copiar varios mensajes)
			</label>
		</div>
		<hr>
		<div class="entries">
			{#each entries as entry}
				{#if uiState.compactMode}
					<CompactMessage {...entry}/>
				{:else}
					{#if entry.event === 'MESSAGE'}
						<ChatMessage
							username={entry.user}
							timestamp={entry.timestamp}
							message={entry.text}
							isRoleplay={false} />
					{:else if entry.event === 'ME'}
						<ChatMessage
							username={entry.user}
							timestamp={entry.timestamp}
							message={entry.text}
							isRoleplay={true} />
					{:else}
						<SystemMessage {...entry} />
					{/if}				
				{/if}
			{/each}
		</div>
	</section>
</main>

<style>
	.notif-message {
	    position: relative;
	    bottom: 10px !important;
	    margin-left: 6px;
	}
</style>